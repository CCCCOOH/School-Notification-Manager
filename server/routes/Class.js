const { listClass, clearClass, removeClass, createClass, updateClass, addNotify, modifyNotify, listNotify, listClassNotify, listNotifyUser, removeNotify, notifyDetail, getClassMembers } = require('../controllers/Class')
const express = require('express')
const router = express.Router()

router.get('/', listClass)
router.get('/notify_user', listNotifyUser)
router.get('/members', getClassMembers)
router.get('/notify_class', listClassNotify)
router.get('/notify_detail', notifyDetail)
router.post('/create', createClass)
router.post('/update', updateClass)
router.post('/notify/add', addNotify)
router.put('/notify/modify', modifyNotify)
router.delete('/clear', clearClass)
router.delete('/remove', removeClass)
router.delete('/removeNotify', removeNotify)

module.exports = router;