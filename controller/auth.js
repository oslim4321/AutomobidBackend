const User = require("../model/userSchema");
const dotenv = require("dotenv");
const { handleLoginErr } = require("../errors/custom-error");
const { createToken } = require("./user");
const { sendResetEmail } = require("../mailer/mail");
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

const resetUserPassword = async (req,res)=>{
  const {email, redirectUrl} = req.body
  try {
    //check if email exists
    const user = await User.findOne({email})
     if (user === null) {
      return res.status(404).json({message:'User not found. Please make sure the provided email is registered.'})
     }  
     //check if user is verified
     if (!user.isVerified) {
      return res.status(400).json({message:'Email has not been verified'})
     }
     sendResetEmail(user, redirectUrl, res)
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'An error occured while checking for existing user'})
  }
}

module.exports = { loginUser, resetUserPassword };
