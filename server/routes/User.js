const { findUser, deleteAll, updateUser, register, login } = require('../controllers/User')

const express = require('express')
const router = express.Router();

router.get('/', findUser)
router.post('/register', register)
router.post('/update', updateUser)
router.post('/login', login)
router.delete('/clear', deleteAll)

module.exports = router