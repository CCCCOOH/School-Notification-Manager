const express = require('express')
const { createNotification } = require('../controllers/DeepSeekController')
const router = express.Router();

router.post('/createNotification', createNotification)

module.exports = router; 