const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Researcher {
  // Register a new researcher
  static async registerResearcher(walletAddress, email = null, institution = null, specialization = null) {
    try {
      const userId = uuidv4();
      // Convert specialization to proper PostgreSQL array if it's provided as a JS array
      const specializationArray = specialization ? 
        (Array.isArray(specialization) ? specialization : [specialization]) : 
        null;
        
      const result = await db.query(
        'INSERT INTO users (id, wallet_address, user_type, email, institution, specialization) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [userId, walletAddress, 'researcher', email, institution, specializationArray]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error registering researcher:', error);
      throw error;
    }
  }

  // Get researcher by wallet address
  static async getByWalletAddress(walletAddress) {
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE wallet_address = $1 AND user_type = $2',
        [walletAddress, 'researcher']
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting researcher by wallet address:', error);
      throw error;
    }
  }

  // Update researcher profile
  static async updateProfile(researcherId, profileData) {
    try {
      const { institution, specialization, bio, name, title } = profileData;
      
      const result = await db.query(
        `UPDATE users 
         SET institution = COALESCE($1, institution), 
             specialization = COALESCE($2, specialization), 
             bio = COALESCE($3, bio),
             name = COALESCE($4, name),
             title = COALESCE($5, title),
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = $6 AND user_type = 'researcher' 
         RETURNING *`,
        [institution, specialization, bio, name, title, researcherId]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Researcher not found');
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating researcher profile:', error);
      throw error;
    }
  }

  // Search available datasets
  static async searchDatasets(filters = {}) {
    try {
      let query = `
        SELECT hdr.id, hdr.data_type, hdr.created_at, hdr.data_size,
               pd.age_group, pd.gender, pd.region,
               cr.consent_type, cr.permissions
        FROM health_data_records hdr
        JOIN consent_records cr ON hdr.id = cr.data_record_id AND cr.is_active = true
        JOIN users u ON hdr.patient_id = u.id
        LEFT JOIN patient_demographics pd ON hdr.patient_id = pd.patient_id
        WHERE cr.permissions->>'researchUse' = 'true'
      `;
      
      const params = [];
      let paramIndex = 1;
      
      // Add filters
      if (filters.dataType) {
        query += ` AND hdr.data_type = $${paramIndex}`;
        params.push(filters.dataType);
        paramIndex++;
      }
      
      if (filters.ageGroup) {
        query += ` AND pd.age_group = $${paramIndex}`;
        params.push(filters.ageGroup);
        paramIndex++;
      }
      
      if (filters.gender) {
        query += ` AND pd.gender = $${paramIndex}`;
        params.push(filters.gender);
        paramIndex++;
      }
      
      if (filters.region) {
        query += ` AND pd.region = $${paramIndex}`;
        params.push(filters.region);
        paramIndex++;
      }
      
      query += ` ORDER BY hdr.created_at DESC`;
      
      const result = await db.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error searching datasets:', error);
      throw error;
    }
  }

  // Request access to patient data
  static async requestAccess(researcherId, datasetId, purpose, duration, requestedFields) {
    try {
      // Get the patient ID who owns this dataset
      const datasetResult = await db.query(
        'SELECT patient_id FROM health_data_records WHERE id = $1',
        [datasetId]
      );
      
      if (datasetResult.rows.length === 0) {
        throw new Error('Dataset not found');
      }
      
      const patientId = datasetResult.rows[0].patient_id;
      
      // Create the access request
      const requestId = uuidv4();
      const result = await db.query(
        `INSERT INTO access_requests 
         (id, requester_id, patient_id, dataset_id, purpose, duration, requested_fields, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') RETURNING *`,
        [requestId, researcherId, patientId, datasetId, purpose, duration, requestedFields]
      );
      
      // Create a notification for the patient
      const notificationId = uuidv4();
      await db.query(
        `INSERT INTO notifications 
         (id, user_id, type, message, related_id) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          notificationId,
          patientId,
          'access_request',
          'A researcher has requested access to your health data',
          requestId
        ]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error requesting access:', error);
      throw error;
    }
  }

  // Get all access requests made by this researcher
  static async getAccessRequests(researcherId) {
    try {
      const result = await db.query(
        `SELECT ar.*, hdr.data_type, u.wallet_address as patient_wallet_address
         FROM access_requests ar
         JOIN health_data_records hdr ON ar.dataset_id = hdr.id
         JOIN users u ON hdr.patient_id = u.id
         WHERE ar.requester_id = $1
         ORDER BY ar.created_at DESC`,
        [researcherId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting access requests:', error);
      throw error;
    }
  }

  // Get approved datasets
  static async getApprovedDatasets(researcherId) {
    try {
      const result = await db.query(
        `SELECT ap.*, hdr.data_type, hdr.ipfs_hash, hdr.data_size, 
                u.wallet_address as patient_wallet_address
         FROM access_policies ap
         JOIN health_data_records hdr ON ap.resource_id = hdr.id
         JOIN users u ON hdr.patient_id = u.id
         WHERE ap.grantee_id = $1 
         AND ap.resource_type = 'health_data'
         AND ap.granted = true
         AND (ap.expires_at IS NULL OR ap.expires_at > CURRENT_TIMESTAMP)
         ORDER BY ap.granted_at DESC`,
        [researcherId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting approved datasets:', error);
      throw error;
    }
  }

  // Get researcher notifications
  static async getNotifications(researcherId) {
    try {
      const result = await db.query(
        `SELECT * FROM notifications 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [researcherId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId, researcherId) {
    try {
      const result = await db.query(
        `UPDATE notifications 
         SET is_read = true 
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [notificationId, researcherId]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Notification not found or not owned by this researcher');
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
}

module.exports = Researcher;