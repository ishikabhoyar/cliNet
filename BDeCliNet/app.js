const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const testRoutes = require('./routes/test');

// Load environment variables
dotenv.config();

// Import routes
const patientRoutes = require('./routes/patient');
const researcherRoutes = require('./routes/researcher');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable CORS
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/patient', patientRoutes);
app.use('/api/researcher', researcherRoutes);
app.use('/api/test', testRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DeCliNet API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
});

// Start server
app.listen(5000, () => {
  console.log(`DeCliNet API running on port 5000`);
});

module.exports = app;