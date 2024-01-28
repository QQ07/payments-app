const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const AuthenticateJWT = require("../middleware/authenticateJWT");
const { JWT_SECRET } = require("../config");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, balance, firstName, lastName } = req.body;
  try {
    const newUser = new User({
      username,
      password,
      balance,
      firstName,
      lastName,
    });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, JWT_SECRET);
    res.json({ msg: "User created Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ message: "Database Error", error });
  }
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
        const token = jwt.sign({ username, role: "user" }, JWT_SECRET);
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
  res.json({ user: req.user.username });
});

router.put("/update", AuthenticateJWT, async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    await User.findOneAndUpdate(
      { username: req.user.username },
      {
        firstName: firstName,
        lastName: lastName,
      }
      // {new:true} // so the new user object(document) is returned
    );
    res.json({ message: `${req.user.username} updated` });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "some error occured" });
  }
});

module.exports = router;
