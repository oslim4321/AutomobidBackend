const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./view/user");
const subscriberRouter = require("./view/subscriber");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use("/api/v1/launch", subscriberRouter);

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URL;

app.listen(port, async (req, res) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("App is listening on port :", port);
  } catch (error) {
    console.log(error.message);
    console.log("Could not connect to database");
  }
});
