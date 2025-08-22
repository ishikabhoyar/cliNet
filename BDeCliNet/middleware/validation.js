const { validationResult, check, body } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Registration validation rules
const registerValidation = [
  check('walletAddress', 'Valid wallet address is required').isEthereumAddress(),
  check('email', 'Please include a valid email').optional().isEmail(),
  validate
];

// Login validation rules
const loginValidation = [
  check('walletAddress', 'Valid wallet address is required').isEthereumAddress(),
  check('signature', 'Signature is required').not().isEmpty(),
  validate
];

// Data submission validation rules
const dataSubmissionValidation = [
  check('dataType', 'Data type is required').not().isEmpty(),
  // Replace isObject with custom validation
  body('consentSettings').custom(value => {
    if (value && typeof value === 'object') return true;
    throw new Error('Consent settings must be an object');
  }),
  body('data').custom(value => {
    if (value && typeof value === 'object') return true;
    throw new Error('Data must be an object');
  }),
  validate
];

// Consent update validation rules
const consentUpdateValidation = [
  check('consentType', 'Consent type is required').not().isEmpty(),
  // Replace isObject with custom validation
  body('permissions').custom(value => {
    if (value && typeof value === 'object') return true;
    throw new Error('Permissions must be an object');
  }),
  validate
];

// Demographics validation rules
const demographicsValidation = [
  check('ageGroup', 'Age group is required').not().isEmpty(),
  check('gender', 'Gender is required').not().isEmpty(),
  check('region', 'Region is required').not().isEmpty(),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  dataSubmissionValidation,
  consentUpdateValidation,
  demographicsValidation
};