const express = require('express');
const router = express.Router();
const { executeCode } = require('../controllers/codeController'); // Correct path to controller

router.post('/run', executeCode); // Defines the /api/judge/run endpoint for code execution

module.exports = router;
