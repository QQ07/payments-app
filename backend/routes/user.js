const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const AuthenticateJWT = require("../middleware/authenticateJWT");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.post("/signup", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ msg: "User created Successfully" });
});
router.post("/login", async (req, res) => {
  console.log("reached here");
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username, password);
  try {
    const user = await User.findOne({ username: username });

    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ username, role: "user" }, SECRET);
        res.json({ message: "Success", token });
      } else {
        res.status(500).json({ message: "wrong password" });
      }
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
});
router.get("/me", AuthenticateJWT, async (req, res) => {
  res.send("you");
});

module.exports = router;
