const { listClass, clearClass, removeClass, createClass, updateClass, addNotify, modifyNotify, listClassNotify, listNotifyUser, removeNotify, notifyDetail, classMembersGet, classMemberAdd, uploadImage, addRead, getRead } = require('../controllers/Class')
const express = require('express')
const router = express.Router()

router.get('/', listClass)
router.get('/notify_user', listNotifyUser)
router.get('/members', classMembersGet)
router.get('/notify_class', listClassNotify)
router.get('/notify_detail', notifyDetail)
router.get('/getRead', getRead)

router.post('/create', createClass)
router.post('/addRead', addRead)
router.post('/update', updateClass)
router.post('/notify/add', addNotify)
router.post('/member/add', classMemberAdd)
router.post('/uploadImage', uploadImage)

router.put('/notify/modify', modifyNotify)

router.delete('/clear', clearClass)
router.delete('/remove', removeClass)
router.delete('/removeNotify', removeNotify)

module.exports = router;