const express = require('express')
const { getAllUsers, getUser, createUser } = require('../controller/user')
const { loginUser } = require('../controller/auth')
const { authenticateToken } = require('../middleware/verifyToken')

const UserRoute = express.Router();

UserRoute.get('/users', authenticateToken ,getAllUsers)
UserRoute.get('/user', authenticateToken ,getUser)
UserRoute.post('/user', createUser)
UserRoute.post('/login', loginUser)

module.exports = UserRoute;
