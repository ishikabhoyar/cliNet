const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Patient = require('../models/patient');
const ipfsService = require('../utils/ipfs');
const encryptionService = require('../utils/encryption');
const { web3, patientDataRegistry } = require('../config/web3');
const db = require('../config/db'); // Add this import

// Register a new patient
exports.register = async (req, res) => {
  try {
    const { walletAddress, email } = req.body;
    
    // Check if patient already exists
    const existingPatient = await Patient.getByWalletAddress(walletAddress);
    if (existingPatient) {
      return res.status(400).json({ error: true, message: 'Patient already registered' });
    }
    
    // Register patient in database
    const newPatient = await Patient.registerPatient(walletAddress, email);
    
    // Generate a JWT token
    const token = jwt.sign(
      { id: newPatient.id, walletAddress: newPatient.wallet_address, userType: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      error: false,
      message: 'Patient registered successfully',
      token,
      patient: {
        id: newPatient.id,
        walletAddress: newPatient.wallet_address,
        email: newPatient.email,
        createdAt: newPatient.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: true, message: 'Server error during registration' });
  }
};

// Authenticate patient with wallet
exports.authenticate = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;
    
    let recoveredAddress = walletAddress; // Default for testing
    
    // Only verify signature in production
    if (process.env.NODE_ENV === 'production') {
      // Verify the signature (simplified - in production, use a proper challenge-response)
      const message = `DeCliNet Authentication Request for ${walletAddress}`;
      recoveredAddress = web3.eth.accounts.recover(message, signature);
      
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({ error: true, message: 'Invalid signature' });
      }
    }
    
    // Get patient from database
    const patient = await Patient.getByWalletAddress(walletAddress);
    if (!patient) {
      return res.status(404).json({ error: true, message: 'Patient not found' });
    }
    
    // Generate a JWT token
    const token = jwt.sign(
      { id: patient.id, walletAddress: patient.wallet_address, userType: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      error: false,
      message: 'Authentication successful',
      token,
      patient: {
        id: patient.id,
        walletAddress: patient.wallet_address,
        email: patient.email,
        createdAt: patient.created_at
      }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: true, message: 'Server error during authentication' });
  }
};

// Get patient profile
exports.getProfile = async (req, res) => {
  try {
    // The user ID is already available in req.user from the auth middleware
    const patient = await Patient.getByWalletAddress(req.user.walletAddress);
    
    if (!patient) {
      return res.status(404).json({ error: true, message: 'Patient not found' });
    }
    
    // Get patient demographics
    const demographics = await db.query(
      'SELECT * FROM patient_demographics WHERE patient_id = $1',
      [patient.id]
    );
    
    // Get statistics about patient data
    const stats = await db.query(
      `SELECT 
        COUNT(*) as total_records,
        SUM(access_count) as total_accesses,
        COUNT(DISTINCT data_type) as unique_data_types
       FROM health_data_records 
       WHERE patient_id = $1`,
      [patient.id]
    );
    
    res.status(200).json({
      error: false,
      patient: {
        id: patient.id,
        walletAddress: patient.wallet_address,
        email: patient.email,
        kycStatus: patient.kyc_status,
        reputationScore: patient.reputation_score,
        createdAt: patient.created_at,
        demographics: demographics.rows[0] || null,
        stats: stats.rows[0] || { 
          total_records: 0, 
          total_accesses: 0, 
          unique_data_types: 0 
        }
      }
    });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving profile' });
  }
};

// Update patient demographics
exports.updateDemographics = async (req, res) => {
  try {
    const { ageGroup, gender, region, anonymizedZip } = req.body;
    
    // Update demographics in database
    const demographics = await Patient.addDemographics(req.user.id, {
      ageGroup, gender, region, anonymizedZip
    });
    
    res.status(200).json({
      error: false,
      message: 'Demographics updated successfully',
      demographics
    });
  } catch (error) {
    console.error('Demographics update error:', error);
    res.status(500).json({ error: true, message: 'Server error updating demographics' });
  }
};

// Submit patient health data
exports.submitHealthData = async (req, res) => {
  try {
    const { 
      data, 
      dataType, 
      consentSettings
    } = req.body;
    
    // 1. Encrypt the data
    const encryptionKey = encryptionService.generateEncryptionKey();
    const encryptedData = encryptionService.encrypt(JSON.stringify(data), encryptionKey);
    
    // 2. Generate metadata
    const metadata = {
      dataType,
      patientId: req.user.id,
      encryptionIV: encryptedData.iv,
      created: new Date().toISOString(),
      consentSettings
    };
    
    // 3. Upload encrypted data to IPFS
    const ipfsHash = await ipfsService.uploadJSON({
      encryptedData: encryptedData.encryptedData,
      metadata
    });
    
    // 4. Upload metadata to IPFS
    const metadataHash = await ipfsService.uploadJSON(metadata);
    
    // 5. Generate data hash for blockchain
    const dataHash = encryptionService.generateDataHash(JSON.stringify(data));
    
    // 6. Encode consent permissions for blockchain
    const consentPermissions = encryptionService.encodeConsentPermissions(consentSettings);
    
    // 7. Store in database
    const dataRecord = await Patient.storeHealthDataRecord(req.user.id, {
      dataHash,
      ipfsHash,
      metadataHash: metadataHash,
      dataType,
      dataSize: Buffer.from(JSON.stringify(data)).length,
      consentHash: encryptionService.generateDataHash(JSON.stringify(consentSettings))
    });
    
    // 8. Store initial consent record
    const consentId = uuidv4();
    await db.query(
      `INSERT INTO consent_records 
       (id, patient_id, data_record_id, consent_type, permissions, is_active) 
       VALUES ($1, $2, $3, $4, $5, true)`,
      [consentId, req.user.id, dataRecord.id, 'initial', consentSettings]
    );
    
    // 9. For demo purposes, just simulate blockchain transaction
    const blockchainTxId = 'mock_tx_' + uuidv4();
    
    // 10. Record a token reward transaction for the data submission
    const rewardAmount = 10; // Example reward amount
    await Patient.recordTokenTransaction(
      req.user.id, 
      'data_submission_reward', 
      rewardAmount, 
      blockchainTxId, 
      dataRecord.id
    );
    
    res.status(201).json({
      error: false,
      message: 'Health data submitted successfully',
      dataRecord: {
        id: dataRecord.id,
        dataType: dataRecord.data_type,
        ipfsHash: dataRecord.ipfs_hash,
        createdAt: dataRecord.created_at
      },
      reward: {
        amount: rewardAmount,
        transactionId: blockchainTxId
      },
      encryptionKey // In production, handle key management securely
    });
  } catch (error) {
    console.error('Health data submission error:', error);
    res.status(500).json({ error: true, message: 'Server error submitting health data' });
  }
};

// Update consent for a data record
exports.updateConsent = async (req, res) => {
  try {
    const { dataRecordId } = req.params;
    const { consentType, permissions, expiryDate } = req.body;
    
    // Update consent in database
    const consent = await Patient.updateConsent(dataRecordId, req.user.id, {
      consentType, permissions, expiryDate
    });
    
    // For demo purposes, simulate blockchain transaction
    const blockchainTxId = 'mock_tx_' + uuidv4();
    
    res.status(200).json({
      error: false,
      message: 'Consent updated successfully',
      consent,
      blockchainTxId
    });
  } catch (error) {
    console.error('Consent update error:', error);
    res.status(500).json({ error: true, message: 'Server error updating consent' });
  }
};

// Get patient's health records
exports.getHealthRecords = async (req, res) => {
  try {
    const records = await Patient.getHealthRecords(req.user.id);
    
    res.status(200).json({
      error: false,
      count: records.length,
      records
    });
  } catch (error) {
    console.error('Health records retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving health records' });
  }
};

// Get a specific health record
exports.getHealthRecord = async (req, res) => {
  try {
    const { recordId } = req.params;
    const record = await Patient.getHealthRecordById(recordId, req.user.id);
    
    if (!record) {
      return res.status(404).json({ error: true, message: 'Health record not found' });
    }
    
    res.status(200).json({
      error: false,
      record
    });
  } catch (error) {
    console.error('Health record retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving health record' });
  }
};

// Get access requests for patient data
exports.getAccessRequests = async (req, res) => {
  try {
    const requests = await Patient.getAccessRequests(req.user.id);
    
    res.status(200).json({
      error: false,
      count: requests.length,
      requests
    });
  } catch (error) {
    console.error('Access requests retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving access requests' });
  }
};

// Respond to an access request
exports.respondToAccessRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { approved } = req.body;
    
    const response = await Patient.respondToAccessRequest(requestId, req.user.id, approved);
    
    res.status(200).json({
      error: false,
      message: `Access request ${approved ? 'approved' : 'rejected'} successfully`,
      response
    });
  } catch (error) {
    console.error('Access request response error:', error);
    res.status(500).json({ error: true, message: 'Server error responding to access request' });
  }
};

// Get patient notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Patient.getNotifications(req.user.id);
    
    res.status(200).json({
      error: false,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Notifications retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving notifications' });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    const notification = await Patient.markNotificationAsRead(notificationId, req.user.id);
    
    res.status(200).json({
      error: false,
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    console.error('Notification update error:', error);
    res.status(500).json({ error: true, message: 'Server error updating notification' });
  }
};

// Get token transactions
exports.getTokenTransactions = async (req, res) => {
  try {
    const transactions = await Patient.getTokenTransactions(req.user.id);
    
    res.status(200).json({
      error: false,
      count: transactions.length,
      transactions
    });
  } catch (error) {
    console.error('Token transactions retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving token transactions' });
  }
};