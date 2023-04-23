const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
  isItCartItem: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false, 
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  restaurantId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  orderDetails: {
    type: mongoose.SchemaTypes.Map,
    required: true,
  },
  totalAmount: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.models("orders", OrderModel);
