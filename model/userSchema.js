const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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
    isVerified:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect Email");
  }
  if (user.isVerified) {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error("Incorrect password");
    } 
    return user;
  }
  else{
    throw new Error('User is not verified')
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
