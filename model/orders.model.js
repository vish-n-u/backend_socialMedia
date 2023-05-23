const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema(
  {
    isItCartItem: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: Map,
      required: true,
    },

    totalAmount: {
      type: String,
      required: true,
    },
    orderSuccessful: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderModel);


