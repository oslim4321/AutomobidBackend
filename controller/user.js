const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../mailer/mail");
const { handleErr } = require("../errors/custom-error");
const { ObjectId } = require("mongodb");

const createToken = (email, id) => {
  // Convert id to string if it's an ObjectId
  const stringId = id instanceof ObjectId ? id.toString() : id;
  const accessToken = jwt.sign(
    { email, id: stringId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return accessToken;
};

const getAllUsers = async (req, res) => {
  try {
    const getAllUsersTask = await User.find().select("-password");
    res.status(200).json(getAllUsersTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    const subject = "Welcome to AutoMobid";
    const message = `Welcome to AutoMotoBids! 🎉 Where the roads to your dream car are always open! Stay tuned for a seamless buying and selling of quality cars.`;
    sendMail(user.email, subject, user.userName, message);
    const accessToken = createToken(email, user._id);
    res
      .status(201)
      .json({ success: true, accessToken, id: user._id.toString() });
  } catch (error) {
    console.log(error);
    let err = handleErr(error);
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUser, createUser, createToken };
