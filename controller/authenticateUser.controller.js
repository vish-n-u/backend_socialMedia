const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = require("../config/server.config");

const User = require("../model/user.model");

exports.verifyUser = async (req, res) => {
  console.log("Entered verify user");
  try {
    let userEmail = await jwt.verify(req.body.token, secretKey);
    if (userEmail) {
      userEmail = await jwt.decode(req.body.token, secretKey);
    }
    console.log("userEmail::", userEmail);
    const user = await User.findOne({
      email: userEmail,
    });
    console.log("---------", user);
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
