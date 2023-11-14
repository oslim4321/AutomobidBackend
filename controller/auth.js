const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { handleLoginErr } = require("../errors/custom-error");
const { createToken } = require("./user");
dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const accessToken = createToken(email, user._id);
    res.status(200).json({ success: true, accessToken, id: user._id });
  } catch (error) {
    console.error(error.message);
    const err = handleLoginErr(error);
    res.status(500).json(err);
  }
};

module.exports = { loginUser };
