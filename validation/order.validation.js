const Order = require("../model/orders.model");

exports.validateCreateOrder = (req, res, next) => {
  console.log("reached....third", req.body);
  if (
    !req.body.restaurantId ||
    !req.body.orderDetails ||
    !req.body.totalAmount
  ) {
    return res.status(404).send({ message: "insufficient data" });
  } else {
    next();
  }
};

exports.validateUpdateOrder = async (req, res, next) => {
  console.log("hit order", req.body.id);
  if (!req.body.id) {
    return res.status(404).send({ message: "insufficient data" });
  } else {
    try {
      let oldOrder = await Order.findOne({ _id: req.body.id });
      if (oldOrder) {
        req.user = oldOrder;
        next();
      } else {
        return res.status(404).send({ message: "Invalid data provided" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "internal server err" });
    }
  }
};
