const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/server.config");

const User = require("../model/user.model");

exports.verifyUser = async (req, res) => {
  console.log("Entered verify user");
  try {
    userEmail = jwt.decode(req.body.token, secretKey);

    console.log("userEmail::", userEmail);
    const user = await User.findOne({
      email: userEmail.email,
    });
    if (req.body.newAccessToken)
      return res.status(200).send({
        message: {
          imgLink: user.imgLink,
          userName: user.userName,
          email: user.email,
          newAccessToken: newAccessToken,
        },
      });
    return res.status(200).send({
      message: {
        imgLink: user.imgLink,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server");
  }
};
