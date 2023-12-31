const { handleSubscriberErr } = require("../errors/custom-error");
const { sendMail } = require("../mailer/mail");
const Subscriber = require("../model/subscribersSchema");

const saveUserDetails = async (req, res) => {
  try {
    const message = `Welcome to AutoMotoBids! 🎉 Where the roads to your dream car are always open! Stay tuned for a seamless buying and selling of quality cars.`;
    const subject = "Welcome to AutoMobid";
    const { email } = req.body;

    const existingSubscribers = await Subscriber.findOne({ email });
    if (existingSubscribers) {
      return res
        .status(409)
        .json({ message: "This email has already subscribed." });
    }
    const user = await Subscriber.create({ email });
    if (user._id) {
      sendMail(user.email, subject, user.userName, message); //send welcome mail to subscriber
      res.status(200).json({ success: true });
    }
  } catch (error) {
    let err = handleSubscriberErr(error);
    res.status(500).json(err);
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
