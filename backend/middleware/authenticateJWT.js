const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function AuthenticateJWT(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid JWT token" });
  }
  next();
}
module.exports = AuthenticateJWT;
