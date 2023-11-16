const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userVerificationSchema = Schema(
  {
    userId: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
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
