const { sendMail } = require("../mailer/mail");
const Subscriber = require("../model/subscribersSchema");

const saveUserDetails = async (req, res) => {
  try {
    const message = `Hi,
    Welcome to AutoMotoBids! 🎉 Where the roads to your dream car are always open! Stay tuned for a seamless buying and selling of quality cars.`;
    const subject = "Welcome to AutoMobid";
    const { email } = req.body;
    const user = await Subscriber.create({ email });
    sendMail(user.email, subject, message); //send welcome mail to subscriber
    res.status(200).json({ success: true });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({ message: 'Email already exists. Please use a different email address.' });
    }
    else
    res.status(500).json({ message: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveUserDetails, getAllSubscribers };
