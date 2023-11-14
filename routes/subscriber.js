const express = require('express')
const { saveUserDetails, getAllSubscribers } = require('../controller/subcription')
const { authenticateToken } = require('../middleware/verifyToken')
const validation = require('../middleware/validation')
const { subscriberValidationSchema } = require('../validation/validationSchemas')
const subscriberRouter = express.Router()

subscriberRouter.post('/subscriber', validation(subscriberValidationSchema) ,saveUserDetails)
subscriberRouter.get('/subscriber', authenticateToken ,getAllSubscribers)

module.exports = subscriberRouter