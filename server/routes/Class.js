const { listClass, clearClass, removeClass, createClass, updateClass } = require('../controllers/Class')
const express = require('express')
const router = express.Router()

router.get('/', listClass)
router.post('/create', createClass)
router.post('/update', updateClass)
router.delete('/clear', clearClass)
router.delete('/remove', removeClass)

module.exports = router;