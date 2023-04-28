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
