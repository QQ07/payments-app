function AuthenticateJWT(req, res, next) {
  console.log(req.headers);
  console.log(req);
  next()
}
module.exports = AuthenticateJWT