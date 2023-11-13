const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { handleLoginErr } = require("../errors/custom-error");
dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(400).json({ message: "User not found" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      const accessToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({ accessToken });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    const err = handleLoginErr(error);
    res.status(500).json(err);
  }
};

module.exports = { loginUser };
