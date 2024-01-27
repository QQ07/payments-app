const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URL, DB } = process.env;
mongoose.connect(MONGO_URL + DB);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: String,
  balance: Number,
  dateCreated: { type: Date, default: Date.now },
});

const User = mongoose.model("users", UserSchema);

module.exports = { User };
