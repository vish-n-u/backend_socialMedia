const mongoose = require("mongoose");

const menuModel = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: Map,
    required: true,
  },
});

module.exports =   mongoose.model("menuDetails", menuModel);
