const express = require('express')
const { saveUserDetails, getAllSubscribers } = require('../controller/subcription')
const { authenticateToken } = require('../middleware/verifyToken')
const subscriberRouter = express.Router()

subscriberRouter.post('/subscriber', saveUserDetails)
subscriberRouter.get('/subscriber', authenticateToken ,getAllSubscribers)

module.exports = subscriberRouter