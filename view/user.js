const express = require('express')
const { getAllUsers, getUserById, createUser } = require('../controller/user')
const { loginUser } = require('../controller/auth')
const { authenticateToken } = require('../middleware/verifyToken')

const UserRoute = express.Router()

router.get('/user', authenticateToken ,getAllUsers)
router.get('/user/:id', authenticateToken ,getUserById)
router.post('/user', createUser)
router.post('/login', loginUser)

module.exports = UserRoute