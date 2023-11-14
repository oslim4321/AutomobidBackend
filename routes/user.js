const express = require('express')
const { getAllUsers, getUser, createUser } = require('../controller/user')
const { loginUser } = require('../controller/auth')
const { authenticateToken } = require('../middleware/verifyToken');
const validation = require('../middleware/validation');
const { userValidationSchema } = require('../validation/validationSchemas');

const UserRoute = express.Router();

UserRoute.get('/users', authenticateToken ,getAllUsers)
UserRoute.get('/user', authenticateToken ,getUser)
UserRoute.post('/user', validation(userValidationSchema) ,createUser)
UserRoute.post('/login', loginUser)

module.exports = UserRoute;
