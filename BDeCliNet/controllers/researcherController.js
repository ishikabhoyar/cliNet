const jwt = require('jsonwebtoken');
const Researcher = require('../models/researcher');
const ipfsService = require('../utils/ipfs');

// Register a new researcher
exports.register = async (req, res) => {
  // Get these variables at the top level of the function so they're accessible in the catch block
  const { walletAddress, email, name, googleId, profilePicture } = req.body;
  
  try {
    // Check if researcher already exists
    const existingResearcher = await Researcher.getByWalletAddress(walletAddress);
    if (existingResearcher) {
      // Generate JWT token for existing researcher
      const token = jwt.sign(
        { 
          id: existingResearcher.id, 
          walletAddress: existingResearcher.wallet_address, 
          userType: 'researcher',
          email: existingResearcher.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      return res.status(200).json({ 
        error: false, 
        message: 'Researcher already registered', 
        code: 'RESEARCHER_EXISTS',
        token,
        researcher: {
          id: existingResearcher.id,
          walletAddress: existingResearcher.wallet_address,
          email: existingResearcher.email,
          name: existingResearcher.name,
          createdAt: existingResearcher.created_at
        }
      });
    }
    
    // Register researcher in database
    const researcher = await Researcher.registerResearcher(walletAddress, email, null, null);
    
    // Generate a JWT token
    const token = jwt.sign(
      { id: researcher.id, walletAddress: researcher.wallet_address, userType: 'researcher' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      error: false,
      message: 'Researcher registered successfully',
      token,
      researcher: {
        id: researcher.id,
        walletAddress: researcher.wallet_address,
        email: researcher.email,
        name: researcher.name,
        createdAt: researcher.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Check for duplicate key error
    if (error.code === '23505' && error.constraint === 'users_wallet_address_key') {
      // Handle the case where the wallet address already exists
      try {
        // Get the existing researcher - walletAddress is now in scope
        const existingResearcher = await Researcher.getByWalletAddress(walletAddress);
        
        // Generate JWT token for existing researcher
        const token = jwt.sign(
          { 
            id: existingResearcher.id, 
            walletAddress: existingResearcher.wallet_address, 
            userType: 'researcher',
            email: existingResearcher.email
          },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        return res.status(200).json({ 
          error: false, 
          message: 'Researcher already registered', 
          code: 'RESEARCHER_EXISTS',
          token,
          researcher: {
            id: existingResearcher.id,
            walletAddress: existingResearcher.wallet_address,
            email: existingResearcher.email,
            name: existingResearcher.name,
            createdAt: existingResearcher.created_at
          }
        });
      } catch (secondaryError) {
        console.error('Error handling existing researcher:', secondaryError);
        return res.status(400).json({ error: true, message: 'Wallet address already registered' });
      }
    }
    
    res.status(500).json({ error: true, message: 'Server error during registration' });
  }
};

// Authenticate researcher
exports.authenticate = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;
    
    // In a real app, verify the signature
    // For now, just check if the researcher exists
    const researcher = await Researcher.getByWalletAddress(walletAddress);
    if (!researcher) {
      return res.status(404).json({ error: true, message: 'Researcher not found' });
    }
    
    // Generate a JWT token
    const token = jwt.sign(
      { id: researcher.id, walletAddress: researcher.wallet_address, type: 'researcher' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      error: false,
      message: 'Authentication successful',
      token,
      researcher: {
        id: researcher.id,
        walletAddress: researcher.wallet_address,
        email: researcher.email,
        name: researcher.name,
        institution: researcher.institution,
        specialization: researcher.specialization,
        bio: researcher.bio,
        title: researcher.title,
        createdAt: researcher.created_at
      }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: true, message: 'Server error during authentication' });
  }
};

// Get researcher profile
exports.getProfile = async (req, res) => {
  try {
    const researcher = await Researcher.getByWalletAddress(req.user.walletAddress);
    
    if (!researcher) {
      return res.status(404).json({ error: true, message: 'Researcher not found' });
    }
    
    res.status(200).json({
      error: false,
      researcher: {
        id: researcher.id,
        walletAddress: researcher.wallet_address,
        email: researcher.email,
        name: researcher.name,
        institution: researcher.institution,
        specialization: researcher.specialization,
        bio: researcher.bio,
        title: researcher.title,
        createdAt: researcher.created_at
      }
    });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving profile' });
  }
};

// Update researcher profile
exports.updateProfile = async (req, res) => {
  try {
    const { institution, specialization, bio, name, title } = req.body;
    
    const updatedProfile = await Researcher.updateProfile(req.user.id, {
      institution, specialization, bio, name, title
    });
    
    res.status(200).json({
      error: false,
      message: 'Profile updated successfully',
      researcher: {
        id: updatedProfile.id,
        walletAddress: updatedProfile.wallet_address,
        email: updatedProfile.email,
        name: updatedProfile.name,
        institution: updatedProfile.institution,
        specialization: updatedProfile.specialization,
        bio: updatedProfile.bio,
        title: updatedProfile.title,
        updatedAt: updatedProfile.updated_at
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: true, message: 'Server error updating profile' });
  }
};

// Search available datasets
exports.searchDatasets = async (req, res) => {
  try {
    const { dataType, ageGroup, gender, region } = req.query;
    
    const datasets = await Researcher.searchDatasets({
      dataType, ageGroup, gender, region
    });
    
    res.status(200).json({
      error: false,
      count: datasets.length,
      datasets
    });
  } catch (error) {
    console.error('Dataset search error:', error);
    res.status(500).json({ error: true, message: 'Server error searching datasets' });
  }
};

// Request access to a dataset
exports.requestAccess = async (req, res) => {
  try {
    const { datasetId, purpose, duration, requestedFields } = req.body;
    
    const request = await Researcher.requestAccess(
      req.user.id,
      datasetId,
      purpose,
      duration,
      requestedFields
    );
    
    res.status(201).json({
      error: false,
      message: 'Access request submitted successfully',
      request
    });
  } catch (error) {
    console.error('Access request error:', error);
    res.status(500).json({ error: true, message: 'Server error submitting access request' });
  }
};

// Get all access requests made by this researcher
exports.getAccessRequests = async (req, res) => {
  try {
    const requests = await Researcher.getAccessRequests(req.user.id);
    
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

// Get approved datasets
exports.getApprovedDatasets = async (req, res) => {
  try {
    const datasets = await Researcher.getApprovedDatasets(req.user.id);
    
    res.status(200).json({
      error: false,
      count: datasets.length,
      datasets
    });
  } catch (error) {
    console.error('Approved datasets retrieval error:', error);
    res.status(500).json({ error: true, message: 'Server error retrieving approved datasets' });
  }
};

// Access dataset data
exports.accessDataset = async (req, res) => {
  try {
    const { datasetId } = req.params;
    
    // Check if researcher has access to this dataset
    const accessPolicies = await Researcher.getApprovedDatasets(req.user.id);
    const hasAccess = accessPolicies.some(policy => policy.resource_id === datasetId);
    
    if (!hasAccess) {
      return res.status(403).json({ error: true, message: 'Access denied to this dataset' });
    }
    
    // Get the dataset that matches this ID
    const dataset = accessPolicies.find(policy => policy.resource_id === datasetId);
    
    if (!dataset) {
      return res.status(404).json({ error: true, message: 'Dataset not found' });
    }
    
    // Retrieve data from IPFS
    try {
      const data = await ipfsService.retrieveJSON(dataset.ipfs_hash);
      
      // In a real application, this data would be decrypted with the researcher's access key
      
      res.status(200).json({
        error: false,
        dataset: {
          id: dataset.resource_id,
          dataType: dataset.data_type,
          dataSize: dataset.data_size,
          patientWalletAddress: dataset.patient_wallet_address,
          data
        }
      });
    } catch (ipfsError) {
      console.error('IPFS retrieval error:', ipfsError);
      res.status(500).json({ error: true, message: 'Error retrieving dataset from storage' });
    }
  } catch (error) {
    console.error('Dataset access error:', error);
    res.status(500).json({ error: true, message: 'Server error accessing dataset' });
  }
};

// Get researcher notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Researcher.getNotifications(req.user.id);
    
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

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    const notification = await Researcher.markNotificationAsRead(notificationId, req.user.id);
    
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