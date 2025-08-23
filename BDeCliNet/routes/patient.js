const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');
const { 
  registerValidation, 
  loginValidation,
  dataSubmissionValidation,
  consentUpdateValidation,
  demographicsValidation
} = require('../middleware/validation');

// Public routes
router.post('/register', registerValidation, patientController.register);
router.post('/authenticate', loginValidation, patientController.authenticate);

// Protected routes (require authentication)
router.get('/profile', auth, patientController.getProfile);
router.put('/demographics', auth,demographicsValidation, patientController.updateDemographics);
router.post('/health-data', auth, dataSubmissionValidation, patientController.submitHealthData);
router.put('/consent/:dataRecordId', auth, consentUpdateValidation, patientController.updateConsent);
router.get('/health-records', auth, patientController.getHealthRecords);
router.get('/health-records/:recordId', auth, patientController.getHealthRecord);
router.get('/access-requests', auth, patientController.getAccessRequests);
router.post('/access-requests/:requestId/respond', auth, patientController.respondToAccessRequest);
router.get('/notifications', auth, patientController.getNotifications);
router.put('/notifications/:notificationId/read', auth, patientController.markNotificationAsRead);
router.get('/token-transactions', auth, patientController.getTokenTransactions);
router.get('/token-balance', auth, patientController.getTokenBalance);

module.exports = router;