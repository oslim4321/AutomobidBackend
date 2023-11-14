const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { sendMail } = require("../mailer/mail");
const { handleErr } = require("../errors/custom-error");
const { ObjectId } = require('mongodb');

const createToken = (email, id)=>{
  // Convert id to string if it's an ObjectId
  const stringId = id instanceof ObjectId ? id.toString() : id;
  const accessToken = jwt.sign(
    { email, id: stringId},
    process.env.ACCESS_TOKEN_SECRET
  );
  return accessToken
}

const getAllUsers = async (req, res) => {
  try {
    const getAllUsersTask = await User.find().select("-password");
    res.status(200).json(getAllUsersTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
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
    const subject = "Welcome to AutoMobid";
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    if (user) {
      const message = `Welcome to AutoMotoBids! 🎉 Where the roads to your dream car are always open! Stay tuned for a seamless buying and selling of quality cars.`;
      sendMail(user.email, subject, user.userName ,message); //send welcome mail to newly created user
      const loginTask = User.login(email,password)
      const accessToken = createToken(email, user._id)
      res.status(201).json({ success: true, accessToken, id: user._id.toString() });
    }
  } catch (error) {
    console.log(error);
    let err = handleErr(error);
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserById, createUser, createToken };


