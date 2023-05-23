const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { secretKey, refreshKey } = require("../config/server.config");
exports.verifyJwt = async (req, res, next) => {
  console.log("reached.....second", req.body);
  try {
    if (!req.body.token) {
      return res.status(401).send({ message: "token" });
    }

    try {
      // console.log("reached.....second2");
      const isValidJwt = await jwt.verify(req.body.token, secretKey);
      // console.log(isValidJwt);
      // If the JWT is valid, set the user in the request and continue
      let { email } = jwt.decode(req.body.token);
      // console.log(email);
      let user = await User.findOne({ email });
      req.user = user;
      // console.log(user);
      next();
    } catch (jwtError) {
      // console.log("INVALID JWT");
      // If the JWT has expired, try to refresh it with the refresh token
      if (jwtError.name === "TokenExpiredError") {
        // console.log("INVALID JWT 2");
        if (req.body.refreshToken) {
          try {
            // console.log("REFRESHTOKEN ERROR");
            const isValidRefreshToken = jwt.verify(
              req.body.refreshToken,
              refreshKey
            );
            // console.log("REFRESHTOKEN ERROR2");
            // If the refresh token is valid, generate a new JWT and continue
            let { email } = jwt.decode(req.body.refreshToken);
            // console.log("REFRESHTOKEN ERROR3 email", email);
            let newAccessToken = await jwt.sign({ email }, secretKey, {
              expiresIn: "10 minutes",
            });
            // console.log("email", email);
            let doesUserExist = await User.findOne({ email: email });
            // console.log("doesUserExist", doesUserExist);
            if (!doesUserExist) {
              return res.status(401).send({ message: "logout" });
            }
            req.body.newAccessToken = newAccessToken;
            req.user = doesUserExist;
            next();
          } catch (refreshError) {
            console.log("REFRESHTOKEN ERROR", refreshError);
            // If the refresh token is invalid, return an error
            return res.status(401).send({ message: "logout" });
          }
        } else {
          // If no refresh token is provided, return an error
          return res.status(401).send({ message: "logout" });
        }
      } else {
        // If the JWT error is not related to expiration, return an error
        return res.status(401).send({ message: { token: "Invalid token" } });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal Server err" });
  }
};
