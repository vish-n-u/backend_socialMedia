const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {secretKey} = require("../config/server.config");

const User = require("../model/user.model");

exports.registration = async (req, res) => {
  console.log("registration", req.user);
  try {
    if (req.user) {
      const obj = {
        userName: req.user.userName,

        email: req.user.email,
        imgLink: req.user.imgLink,
      };
      let token = jwt.sign(newUser.email, secretKey);
      return res.status(201).send({
        message: {
          imgLink: newUser.imgLink,
          token,
        },
      });
    }
    const isUserDeleted = await User.findOne({ email: req.body.email });
    console.log("isUserDeleted", isUserDeleted);
    const obj = {
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      imgLink: req.body.imgLink,
    };
    const newUser = await User.create(obj);

    let token = jwt.sign(newUser.email, secretKey);
    return res.status(201).send({
      message: {
        imgLink: newUser.imgLink,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server err");
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const newUser = await User.deleteOne({ email: req.body.email });
    return res.status(200).send({ message: "Successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server err");
  }
};

exports.login = async (req, res) => {
  console.log("enterd login", req.body);

  try {
    let token = jwt.sign(req.doesUserExist.email, secretKey);
    return res.status(200).send({
      message: {
        imgLink: req.doesUserExist.imgLink,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server err..");
  }
};
exports.verify = async (req, res) => {
  try {
    console.log("entered verify", req.user);
    if (req.user) {
      let token = jwt.sign(req.user.email, secretKey);
      return res.status(201).send({
        message: {
          imgLink: req.user.imgLink,
          token,
        },
      });
    } else {
      const obj = {
        userName: req.payload.name,
        email: req.payload.email,
        imgLink: req.payload.picture,
        googleSignedIn: true,
      };
      let token = jwt.sign(obj.email, secretKey);
      const newUser = await User.create(obj);
      return res.status(201).send({
        message: {
          imgLink: newUser.imgLink,
          token,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("server err");
  }
};
