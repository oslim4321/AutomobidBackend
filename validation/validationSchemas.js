const yup = require('yup')

const userValidationSchema = yup.object({
    userName: yup.string().required('Please provide username'),
    email: yup.string().email('Please provide a valid email').required('Please provide email'),
    password: yup.string().min(6, 'Password must be at least 6 character length').required('Please provide password')
})

const subscriberValidationSchema = yup.object({
    email: yup.string().email('Please provide a valid email').required('Plese provide email')
})
const userLoginSchema = yup.object({
    email: yup.string().email('Please provide a valid email').required('Plese provide email'),
    password: yup.string().min(6, 'Password must be at least 6 character length').required('Please provide password')
})

module.exports = {userValidationSchema, subscriberValidationSchema,userLoginSchema}