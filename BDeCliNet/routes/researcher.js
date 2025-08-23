const express = require('express');
const router = express.Router();
const researcherController = require('../controllers/researcherController');
const auth = require('../middleware/auth');
const { 
  registerValidation, 
  loginValidation 
} = require('../middleware/validation');

// Public routes
router.post('/register', registerValidation, researcherController.register);
router.post('/authenticate', loginValidation, researcherController.authenticate);

// Protected routes
router.get('/profile', auth, researcherController.getProfile);
router.put('/profile', auth, researcherController.updateProfile);
router.get('/datasets/search', auth, researcherController.searchDatasets);
router.post('/datasets/request-access', auth, researcherController.requestAccess);
router.get('/access-requests', auth, researcherController.getAccessRequests);
router.get('/approved-datasets', auth, researcherController.getApprovedDatasets);
router.get('/datasets/:datasetId/access', auth, researcherController.accessDataset);
router.get('/notifications', auth, researcherController.getNotifications);
router.put('/notifications/:notificationId/read', auth, researcherController.markNotificationAsRead);

module.exports = router;