const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ msg: "User created Successfully" });
});
router.post("/login", async (req, res) => {
  console.log("reached here")
  const { username, password } = req.body;
  console.log(username, password);
  if (username) {
    const token = jwt.sign({ email, role: "user" }, SECRET);
    res.json({ message: "Success", token });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
