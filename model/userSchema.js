const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    userName: {
      type: String,
      // unique: [true, "This username already exists"],
      required: [true, "Please enter a username"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
