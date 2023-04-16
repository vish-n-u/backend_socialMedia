const mongoose = require("mongoose");
const User = require("../model/user.model");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
exports.registrationValidation = async (req, res, next) => {
  try {
    let doesUserExist = await doesEmailIdExist(req, res);

    if (!doesUserExist || doesUserExist.googleSignedIn) {
      if (doesUserExist.googleSignedIn) req.user = doesUserExist;
      next();
    } else return res.status(400).send("Email already exists!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("server err");
  }
};

exports.validateGoogleSignIn = async (req, res, next) => {
  console.log("enterd validateGoogleSignIn");
  try {
    const client = new OAuth2Client(req.body.client_id);

    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: req.body.client_id,
    });
    // Get the JSON with all the user info

    const payload = ticket.getPayload();
    // This is a JSON object that contains
    // all the user info
    let doesUserExist = await doesEmailIdExist(req, res, payload);
    
    if (doesUserExist) req.user = doesUserExist;
    else req.payload = payload;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server err");
  }
};

exports.validateLogin = async (req, res, next) => {
  try {
    console.log("validateLogin Entered");
    const doesUserExist = await doesEmailIdExist(req, res);
    if (!doesUserExist) {
      return res.status(404).send({ message: "invalid" });
    } else {
      req.doesUserExist = doesUserExist;
      if (req.body.requestFor !== "otpBased") {
        if (
          !bcrypt.compareSync(req.body.password, req.doesUserExist.password)
        ) {
          return res.status(404).send({
            message: {
              password: "incorrect",
            },
          });
        }
      }
      next();
    }
  } catch (er) {
    console.log(err);
    return res.status(500).send("internal err");
  }
};

const doesEmailIdExist = async (req, res, payload) => {
  try {
    let doesUserExist = await User.findOne({
      email: req.body.email,
    });
    if (!doesUserExist && payload)
      doesUserExist = await User.findOne({ email: payload.email });
    if (!doesUserExist) {
      return false;
    } else {
      return doesUserExist;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("server err");
  }
};
