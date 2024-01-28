const express = require("express");
const userRouter = require("./user");
require("dotenv").config();
const APIrouter = express.Router();

APIrouter.use("/user", userRouter);

APIrouter.get("/", (req, res) => {
  res.send("You've reached the v1 API of Payments app");
});

module.exports = APIrouter;
