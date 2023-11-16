const mongoose = require('mongoose')
const {Schema} = mongoose

const PasswordResetSchema = Schema({
    userId : {
        type:String,
        required: true
    },
    resetString: {
      type: String,
      required: [true, "Please generate unique string"],
    },
    createdAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    }
})
const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema)

module.exports = PasswordReset