const User = require("../model/userSchema");
const dotenv = require("dotenv");
const { handleLoginErr } = require("../errors/custom-error");
const { createToken } = require("./user");
const { sendResetEmail } = require("../mailer/mail");
const PasswordReset = require("../model/passwordReset");
const bcrypt = require("bcrypt");
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

const resetUserPassword = async (req, res) => {
  const { email, redirectUrl } = req.body;
  try {
    //check if email exists
    const user = await User.findOne({ email });
    if (user === null) {
      return res
        .status(404)
        .json({
          message:
            "User not found. Please make sure the provided email is registered.",
        });
    }
    //check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Email has not been verified" });
    }
    sendResetEmail(user, redirectUrl, res);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while checking for existing user" });
  }
};

const actuallyResetUserPassword = async (req, res) => {
  const { userId, resetString, newPassword } = req.body;

  try {
    const newPasswordReset = await PasswordReset.findOne({ userId });
    if (newPasswordReset === null) {
      return res
        .status(404)
        .json({ message: "Password reset request not found" });
    }
    const { expiresAt } = newPasswordReset;
    if (expiresAt < Date.now()) {
      try {
        await PasswordReset.deleteOne({ userId });
        return res
          .status(404)
          .json({ message: "Password reset link has expired" });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Could not delete Password reset link" });
      }
    } else {
      const { resetString: hashedResetString } = newPasswordReset;
      //validate reset record
      try {
        const resetCheck = await bcrypt.compare(resetString, hashedResetString);
        if (resetCheck) {
          //strings matched
          const salt = await bcrypt.genSalt();
          const hashedNewPassword = await bcrypt.hash(newPassword, salt); //hash password

          try {
            //update password
            await User.updateOne(
              { _id: userId },
              { password: hashedNewPassword }
            );
            try {
              //Delete password reset record
            await PasswordReset.deleteOne({userId})
            res
              .status(200)
              .json({ message: "Password reset successful. You can now log in with your new password." });
            } catch (error) {
              console.log(error);
              res
              .status(500)
              .json({ message: "Error occured while deleting password reset details" });
            }
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .json({ message: "Updating user password failed" });
          }
        } else {
          //existing but incorrect reset string passed
          return res
            .status(500)
            .json({ message: "Invalid password reset details passed" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Comparing password reset strings failed" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Checking for existing password reset record failed" });
  }
};

module.exports = { loginUser, resetUserPassword, actuallyResetUserPassword };
