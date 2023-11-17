const express = require('express')
const { getAllUsers, getUser, createUser, verifyUser, userHasbeenVerified, userHasNotbeenVerified } = require('../controller/user')
const { loginUser, resetUserPassword, actuallyResetUserPassword } = require('../controller/auth')
const { authenticateToken } = require('../middleware/verifyToken');
const validation = require('../middleware/validation');
const { userValidationSchema, userLoginSchema } = require('../validation/validationSchemas');

const UserRoute = express.Router();

UserRoute.get('/users', authenticateToken ,getAllUsers)
UserRoute.get('/user', authenticateToken ,getUser)
UserRoute.post('/user', validation(userValidationSchema) ,createUser)
UserRoute.post('/login', validation(userLoginSchema),loginUser)
UserRoute.get('/user/verify/:userId/:uniqueString', verifyUser)
UserRoute.get('/user/verified', userHasbeenVerified)
UserRoute.get('/user/verified/error', userHasNotbeenVerified)
UserRoute.post('/user/requestPasswordReset', resetUserPassword)
UserRoute.post('/user/resetPassword', actuallyResetUserPassword)

module.exports = UserRoute;
