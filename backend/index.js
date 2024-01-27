const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.get("/", (req, res) => {
  console.log("ehlo");
  res.send("payments app");
});
app.post("/login", async (req, res) => {
  console.log("reached here");
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.find({ username });
    if (user.password == password) res.json({ msg: "User Logged in" });
    else res.json({ msg: "wrong password" });
  } catch (error) {
    console.log(error);
    res.json({ message: "some error occured" });
  }
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log("http://localhost:" + (process.env.PORT || 3000));
});
