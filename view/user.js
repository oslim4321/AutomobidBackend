const express = require('express')
const { getAllUsers, getUserById, createUser } = require('../controller/user')
const { loginUser } = require('../controller/auth')
const { authenticateToken } = require('../middleware/verifyToken')

const UserRoute = express.Router()

UserRoute.get('/user', authenticateToken ,getAllUsers)
UserRoute.get('/user/:id', authenticateToken ,getUserById)
UserRoute.post('/user', createUser)
UserRoute.post('/login', loginUser)

module.exports = UserRoute