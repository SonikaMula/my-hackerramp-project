const express = require('express');
const router = express.Router();
const measurementsController = require('../controllers/measurementsController');

// Define a route that uses the processMeasurements method from the controller
router.post('/process-measurements', measurementsController.processMeasurements);

module.exports = router;
