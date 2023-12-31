const mongoose = require("mongoose");
const { Schema } = mongoose;

const userVerificationSchema = Schema(
  {
    userId: {
      type: String,
      required: [true, "Please enter email"],
    },
    uniqueString: {
      type: String,
      required: [true, "Please generate unique string"],
    },
    createdAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    }
  }
);

const UserVerification = mongoose.model("UserVerification", userVerificationSchema);

module.exports = UserVerification;
