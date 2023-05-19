const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey, refreshKey } = require("../config/server.config");

const User = require("../model/user.model");

exports.registration = async (req, res) => {
  console.log("registration", req.user, secretKey);
  try {
    if (req.user) {
      const newUser = {
        userName: req.user.userName,

        email: req.user.email,
      
      };
      let token = jwt.sign({ email: newUser.email }, secretKey, {
        expiresIn: "10m",
      });
      let refreshToken = jwt.sign({ email: newUser.email }, refreshKey, {
        expiresIn: "60m",
      });
      return res.status(201).send({
        message: {
          userName: newUser.userName,
          
          token,
          refreshToken,
        },
      });
    }
    const isUserDeleted = await User.findOne({ email: req.body.email });
    console.log("isUserDeleted", isUserDeleted);
    const obj = {
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      
    };
    const newUser = await User.create(obj);

    let token = jwt.sign({ email: newUser.email }, secretKey, {
      expiresIn: "10 minutes",
    });
    let refreshToken = jwt.sign({ email: newUser.email }, refreshKey, {
      expiresIn: "1 hour",
    });
    return res.status(201).send({
      message: {
        
        userName: newUser.userName,
        token,
        refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const newUser = await User.deleteOne({ email: req.body.email });
    return res.status(200).send({ message: "Successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};

exports.login = async (req, res) => {
  console.log("enterd login", req.body);

  try {
    let token = jwt.sign({ email: req.doesUserExist.email }, secretKey, {
      expiresIn: "10 minutes",
    });
    let refreshToken = jwt.sign(
      { email: req.doesUserExist.email },
      refreshKey,
      {
        expiresIn: "1 hour",
      }
    );
    return res.status(200).send({
      message: {
      
        userName: req.doesUserExist.userName,
        token,
        refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};
exports.verify = async (req, res) => {
  try {
    console.log("entered verify", req.user);
    if (req.user) {
      let token = jwt.sign({ email: req.user.email }, secretKey, {
        expiresIn: "1 minutes",
      });
      let refreshToken = jwt.sign({ email: req.user.email }, refreshKey, {
        expiresIn: "1 hour",
      });
      return res.status(201).send({
        message: {
        
          token,
          refreshToken,
          userName: req.user.userName,
        },
      });
    } else {
      const obj = {
        userName: req.payload.name,
        email: req.payload.email,
       
        googleSignedIn: true,
      };
      let token = jwt.sign({ email: obj.email }, secretKey, {
        expiresIn: "1 minutes",
      });
      let refreshToken = jwt.sign({ email: obj.email }, refreshKey, {
        expiresIn: "1 hour",
      });
      const newUser = await User.create(obj);
      return res.status(201).send({
        message: {
          
          userName: newUser.userName,
          token,
          refreshToken,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};
