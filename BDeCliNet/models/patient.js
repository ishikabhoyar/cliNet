const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Patient {
  // Register a new patient
  static async registerPatient(walletAddress, email = null) {
    try {
      const userId = uuidv4();
      const result = await db.query(
        'INSERT INTO users (id, wallet_address, user_type, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, walletAddress, 'patient', email]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  }

  // Get patient by wallet address
  static async getByWalletAddress(walletAddress) {
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE wallet_address = $1 AND user_type = $2',
        [walletAddress, 'patient']
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting patient by wallet address:', error);
      throw error;
    }
  }

  // Add patient demographic information
  static async addDemographics(patientId, { ageGroup, gender, region, anonymizedZip }) {
    try {
      // Check if demographics already exist for this patient
      const existingResult = await db.query(
        'SELECT * FROM patient_demographics WHERE patient_id = $1',
        [patientId]
      );
      
      let result;
      if (existingResult.rows.length > 0) {
        // Update existing demographics
        result = await db.query(
          `UPDATE patient_demographics 
           SET age_group = $1, gender = $2, region = $3, anonymized_zip = $4, updated_at = CURRENT_TIMESTAMP 
           WHERE patient_id = $5 RETURNING *`,
          [ageGroup, gender, region, anonymizedZip, patientId]
        );
      } else {
        // Insert new demographics
        result = await db.query(
          `INSERT INTO patient_demographics 
           (patient_id, age_group, gender, region, anonymized_zip) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [patientId, ageGroup, gender, region, anonymizedZip]
        );
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error adding patient demographics:', error);
      throw error;
    }
  }

  // Store health data record metadata
  static async storeHealthDataRecord(patientId, dataInfo) {
    const { dataHash, ipfsHash, metadataHash, dataType, dataSize, consentHash } = dataInfo;
    try {
      const recordId = uuidv4();
      const result = await db.query(
        `INSERT INTO health_data_records 
         (id, patient_id, data_hash, ipfs_hash, metadata_hash, data_type, data_size, consent_hash) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [recordId, patientId, dataHash, ipfsHash, metadataHash, dataType, dataSize, consentHash]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error storing health data record:', error);
      throw error;
    }
  }

  // Update consent for a specific data record
  static async updateConsent(dataRecordId, patientId, consentData) {
    const { consentType, permissions, expiryDate } = consentData;
    try {
      // First check if this patient owns the data record
      const ownershipCheck = await db.query(
        'SELECT id FROM health_data_records WHERE id = $1 AND patient_id = $2',
        [dataRecordId, patientId]
      );
      
      if (ownershipCheck.rows.length === 0) {
        throw new Error('Patient does not own this data record');
      }
      
      const consentId = uuidv4();
      // First, mark all existing consents for this record as inactive
      await db.query(
        'UPDATE consent_records SET is_active = false WHERE data_record_id = $1',
        [dataRecordId]
      );
      
      // Then insert the new consent
      const result = await db.query(
        `INSERT INTO consent_records 
         (id, patient_id, data_record_id, consent_type, permissions, expiry_date, is_active) 
         VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING *`,
        [consentId, patientId, dataRecordId, consentType, permissions, expiryDate]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating consent:', error);
      throw error;
    }
  }

  // Get all health data records for a patient
  static async getHealthRecords(patientId) {
    try {
      const result = await db.query(
        `SELECT hdr.*, cr.permissions, cr.expiry_date, cr.is_active AS consent_active, cr.consent_type
         FROM health_data_records hdr
         LEFT JOIN consent_records cr ON hdr.id = cr.data_record_id AND cr.is_active = true
         WHERE hdr.patient_id = $1
         ORDER BY hdr.created_at DESC`,
        [patientId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting health records:', error);
      throw error;
    }
  }

  // Get a specific health data record by ID
  static async getHealthRecordById(recordId, patientId) {
    try {
      const result = await db.query(
        `SELECT hdr.*, cr.permissions, cr.expiry_date, cr.is_active AS consent_active, cr.consent_type
         FROM health_data_records hdr
         LEFT JOIN consent_records cr ON hdr.id = cr.data_record_id AND cr.is_active = true
         WHERE hdr.id = $1 AND hdr.patient_id = $2`,
        [recordId, patientId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error getting health record by ID:', error);
      throw error;
    }
  }

  // Get access requests for patient data
  static async getAccessRequests(patientId) {
    try {
      const result = await db.query(
        `SELECT ar.*, u.wallet_address, u.user_type, hdr.data_type
         FROM access_requests ar
         JOIN health_data_records hdr ON ar.dataset_id = hdr.id
         JOIN users u ON ar.requester_id = u.id
         WHERE hdr.patient_id = $1
         ORDER BY ar.created_at DESC`,
        [patientId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting access requests:', error);
      throw error;
    }
  }

  // Respond to an access request
  static async respondToAccessRequest(requestId, patientId, approved) {
    try {
      const status = approved ? 'approved' : 'rejected';
      const result = await db.query(
        `UPDATE access_requests 
         SET status = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2 AND (
           SELECT patient_id FROM health_data_records 
           WHERE id = access_requests.dataset_id
         ) = $3
         RETURNING *`,
        [status, requestId, patientId]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Access request not found or not owned by this patient');
      }
      
      // If approved, create an access policy
      if (approved) {
        const accessRequest = result.rows[0];
        const policyId = uuidv4();
        
        // Get expiry based on the requested duration (days)
        let expiryDate = null;
        if (accessRequest.duration) {
          expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + accessRequest.duration);
        }
        
        // Create access policy
        await db.query(
          `INSERT INTO access_policies
           (id, resource_id, resource_type, grantee_id, action, granted, granted_by, granted_at, expires_at, conditions)
           VALUES ($1, $2, 'health_data', $3, 'read', true, $4, CURRENT_TIMESTAMP, $5, $6)`,
          [policyId, accessRequest.dataset_id, accessRequest.requester_id, patientId, expiryDate, accessRequest.requested_fields]
        );
        
        // Create notification for the requester
        const notificationId = uuidv4();
        await db.query(
          `INSERT INTO notifications
           (id, user_id, type, message, related_id)
           VALUES ($1, $2, 'access_granted', $3, $4)`,
          [notificationId, accessRequest.requester_id, 'Your access request has been approved', accessRequest.dataset_id]
        );
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error responding to access request:', error);
      throw error;
    }
  }
  
  // Get patient notifications
  static async getNotifications(patientId) {
    try {
      const result = await db.query(
        `SELECT * FROM notifications 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [patientId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }
  
  // Mark notification as read
  static async markNotificationAsRead(notificationId, patientId) {
    try {
      const result = await db.query(
        `UPDATE notifications 
         SET is_read = true 
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [notificationId, patientId]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Notification not found or not owned by this patient');
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
  
  // Get token transactions for patient
  static async getTokenTransactions(patientId) {
    try {
      const result = await db.query(
        `SELECT * FROM token_transactions 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [patientId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting token transactions:', error);
      throw error;
    }
  }
  
  // Record a token transaction
  static async recordTokenTransaction(patientId, transactionType, amount, blockchainTxHash, relatedActivityId = null) {
    try {
      const transactionId = uuidv4();
      const result = await db.query(
        `INSERT INTO token_transactions 
         (id, user_id, transaction_type, amount, blockchain_tx_hash, related_activity_id) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [transactionId, patientId, transactionType, amount, blockchainTxHash, relatedActivityId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error recording token transaction:', error);
      throw error;
    }
  }
}

module.exports = Patient;