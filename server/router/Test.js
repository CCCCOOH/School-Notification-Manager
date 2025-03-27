const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('I am The test...');
});

module.exports = router; 
