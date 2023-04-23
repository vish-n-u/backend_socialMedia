const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/server.config");
export const verifyJwt = (req, res, next) => {
  if (!req.body.token)
    return res.status(404).send({ message: { token: "Invalid token" } });

  const isValidJwt = jwt.verify(req.body.token);
  if (isValidJwt) next();
  else {
    const isValidRefreshToken = jwt.verify(req.body.refreshToken);
    if (!isValidRefreshToken) {
      return res.status(404).send("Logout");
    } else {
      let email = jwt.decode(req.body.token);
      let newAccessToken = jwt.sign({ email }, secretKey, {
        expiresIn: "10 minutes",
      });
    }
    req.body.newAccessToken = newAccessToken
    next()
  }
};
