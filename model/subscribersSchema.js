const mongoose = require('mongoose')
const validator = require('validator')
const {Schema} = mongoose

const subscriberSchema = Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: [true, 'Email already exists'],
        validator: (value)=>{
            return validator.isEmail(value)
        },
        message: (props)=> `${props.value} is not a valid email`
    }}, {timestamps:true})


const Subscriber = mongoose.model('Subscriber', subscriberSchema)
module.exports = Subscriber