const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./view/user");
const subscriberRouter = require("./view/subscriber");
const { connectDB } = require("./db/connectDB");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use("/api/v1/launch", subscriberRouter);

const port = process.env.PORT || 5000;

app.listen(port, async (req, res) => {
  try {
    await connectDB()
    console.log("App is listening on port :", port);
  } catch (error) {
    console.log(error.message);
    console.log("Could not connect to database");
  }
});
