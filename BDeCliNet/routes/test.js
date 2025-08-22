const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Test endpoint
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Test route is working!' });
});

// Test database connection
router.get('/db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.status(200).json({ 
      message: 'Database connection successful', 
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: 'Database connection failed', 
      details: error.message 
    });
  }
});

// Generate test patient data (for development)
router.post('/generate-patient', async (req, res) => {
  try {
    // 1. Create a test patient
    const walletAddress = '0x' + Math.random().toString(16).substring(2, 42);
    const userId = uuidv4();
    
    const userResult = await db.query(
      'INSERT INTO users (id, wallet_address, user_type, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, walletAddress, 'patient', `test${Math.floor(Math.random() * 1000)}@example.com`]
    );
    
    // 2. Add demographics
    const demoId = uuidv4();
    const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    const genders = ['male', 'female', 'other', 'prefer_not_to_say'];
    const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'];
    
    await db.query(
      `INSERT INTO patient_demographics 
       (id, patient_id, age_group, gender, region, anonymized_zip) 
       VALUES ($1, $2, $3, $4, $5, $6)`,

      [
        demoId, 
        userId, 
        ageGroups[Math.floor(Math.random() * ageGroups.length)],
        genders[Math.floor(Math.random() * genders.length)],
        regions[Math.floor(Math.random() * regions.length)],
        Math.floor(Math.random() * 90000) + 10000
      ]
    );
    
    // 3. Create a few health records
    const dataTypes = ['bloodwork', 'imaging', 'genetic', 'prescription', 'vitals'];
    const healthRecords = [];
    
    for (let i = 0; i < 3; i++) {
      const recordId = uuidv4();
      const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
      const dataHash = '0x' + Math.random().toString(16).substring(2, 66);
      const ipfsHash = 'Qm' + Math.random().toString(16).substring(2, 46);
      
      const recordResult = await db.query(
        `INSERT INTO health_data_records 
         (id, patient_id, data_hash, ipfs_hash, metadata_hash, data_type, data_size, consent_hash) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [recordId, userId, dataHash, ipfsHash, dataHash, dataType, Math.floor(Math.random() * 10000), dataHash]
      );
      
      // Add consent record
      const consentId = uuidv4();
      const permissions = {
        allowResearch: Math.random() > 0.3,
        allowCommercial: Math.random() > 0.7,
        allowSharing: Math.random() > 0.5
      };
      
      await db.query(
        `INSERT INTO consent_records 
         (id, patient_id, data_record_id, consent_type, permissions, is_active) 
         VALUES ($1, $2, $3, $4, $5, true)`,
        [consentId, userId, recordId, 'initial', permissions]
      );
      
      healthRecords.push(recordResult.rows[0]);
    }
    
    res.status(201).json({
      message: 'Test patient created successfully',
      patient: userResult.rows[0],
      healthRecords
    });
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: 'Failed to generate test patient', 
      details: error.message 
    });
  }
});

// Generate test access request (for development)
router.post('/generate-access-request', async (req, res) => {
  try {
    // 1. Get a random patient and their data
    const patientResult = await db.query(
      "SELECT id FROM users WHERE user_type = 'patient' ORDER BY RANDOM() LIMIT 1"
    );
    
    if (patientResult.rows.length === 0) {
      return res.status(400).json({ message: 'No patients found, create a test patient first' });
    }
    
    const patientId = patientResult.rows[0].id;
    
    // 2. Get a health record for this patient
    const recordResult = await db.query(
      "SELECT id FROM health_data_records WHERE patient_id = $1 LIMIT 1",
      [patientId]
    );
    
    if (recordResult.rows.length === 0) {
      return res.status(400).json({ message: 'No health records found for this patient' });
    }
    
    const recordId = recordResult.rows[0].id;
    
    // 3. Create a researcher if none exists
    let researcherId;
    const researcherResult = await db.query(
      "SELECT id FROM users WHERE user_type = 'researcher' LIMIT 1"
    );
    
    if (researcherResult.rows.length === 0) {
      const newResearcherId = uuidv4();
      const resWalletAddress = '0x' + Math.random().toString(16).substring(2, 42);
      
      await db.query(
        "INSERT INTO users (id, wallet_address, user_type, email) VALUES ($1, $2, 'researcher', $3)",
        [newResearcherId, resWalletAddress, 'researcher' + Math.floor(Math.random() * 100) + '@institution.edu']
      );
      
      researcherId = newResearcherId;
    } else {
      researcherId = researcherResult.rows[0].id;
    }
    
    // 4. Create an access request
    const requestId = uuidv4();
    const result = await db.query(
      `INSERT INTO access_requests 
       (id, requester_id, dataset_id, purpose, duration, requested_fields, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *`,
      [
        requestId,
        researcherId,
        recordId,
        'Research on improving patient outcomes',
        30, // 30 days
        { fields: ['age', 'gender', 'results'], anonymized: true }
      ]
    );
    
    // 5. Create a notification
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
    
    res.status(201).json({
      message: 'Test access request created successfully',
      accessRequest: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: 'Failed to generate test access request', 
      details: error.message 
    });
  }
});

module.exports = router;