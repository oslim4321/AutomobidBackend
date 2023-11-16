const User = require("../model/userSchema");
const UserVerification = require("../model/UserVerificationSchema");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail, sendVerificationEmail } = require("../mailer/mail");
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
    //send verification email
    sendVerificationEmail(user, res);
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
const verifyUser = async (req, res) => {
  const { userId, uniqueString } = req.params;

  const userVerification = await UserVerification.find({ userId });
  if (userVerification.length > 0) {
    const { expiresAt } = userVerification[0];
    const hashedUniqueString = userVerification[0].uniqueString;
    1;
    //checking for expired unique string
    if (expiresAt < Date.now()) {
      //record has expired so we delete it
      try {
        await UserVerification.deleteOne({ userId });
      } catch (error) {
        console.log(error);
      } finally {
        return res.redirect("/api/v1/auth/user/verified/error");
      }
    } else {
      //valid record exists so we validate the user string

      //compare
      try {
        const UniqueStringCheck = await bcrypt.compare(
          uniqueString,
          hashedUniqueString
        );
        if (UniqueStringCheck) {
          //strings match
          try {
            await User.updateOne({ _id: userId }, { isVerified: true });
            try {
              await UserVerification.deleteOne({ userId });
            } catch (error) {
              console.log(error);
              console.log("Could not delete user verification record");
            }
            //send greeting mail
            const user = await User.findOne({ _id: userId });
            const subject = "Welcome to AutoMobid";
            const message = `Welcome to AutoMotoBids! 🎉 Where the roads to your dream car are always open! Stay tuned for a seamless buying and selling of quality cars.`;
            sendMail(user.email, subject, user.userName, message);

            return res.redirect("/api/v1/auth/user/verified/");
          } catch (error) {
            console.log(error);
            console.log("could not verify user");
            return res.redirect("/api/v1/auth/user/verified/error");
          }
        } else {
          //existing record but incorrect verification details passed
          console.log("Invalid credentials");
          return res.redirect("/api/v1/auth/user/verified/error");
        }
      } catch (error) {
        console.log(error);
        console.log("Error occured while trying to compare string");
        return res.redirect("/api/v1/auth/user/verified/error");
      }
    }
  } else {
    //user verification does not exist
    return res.redirect("/api/v1/auth/user/verified/error");
  }
};

const userHasbeenVerified = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/verified.html"));
};
const userHasNotbeenVerified = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/verifiedFailed.html"));
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  createToken,
  verifyUser,
  userHasbeenVerified,
  userHasNotbeenVerified,
};
