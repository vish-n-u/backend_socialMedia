const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  googleSignedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", User);
