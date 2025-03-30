const { listClass, clearClass, removeClass, createClass, updateClass, addNotify, modifyNotify, listNotify } = require('../controllers/Class')
const express = require('express')
const router = express.Router()

router.get('/', listClass)
router.get('/notify', listNotify)
router.post('/create', createClass)
router.post('/update', updateClass)
router.post('/notify/add', addNotify)
router.put('/notify/modify', modifyNotify)
router.delete('/clear', clearClass)
router.delete('/remove', removeClass)

module.exports = router;