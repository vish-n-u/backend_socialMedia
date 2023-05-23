const Order = require("../model/orders.model");

exports.createOrder = async (req, res) => {
  console.log("reached....fourth");
  try {
    const newOrder = await Order.create({
      isItCartItem: req.body.isItCartItem,
      email: req.user.email,
      restaurantId: req.body.restaurantId,
      orderDetails: req.body.orderDetails,
      totalAmount: req.body.totalAmount,
    });
    console.log("reached here tooo", newOrder);
    if (req.body.newAccessToken)
      newOrder.newAccessToken = req.body.newAccessToken;
    return res.status(201).send({ message: newOrder });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};

exports.getAllOrders = async (req, res) => {
  const queryParam = parseInt(req.query.num) || 0;

  console.log("queryParam", req.query.num);
  const skip = queryParam === 0 ? 0 : queryParam * 2;
  const userOrders = await Order.find({ email: req.user.email })
    .sort({ createdAt: -1 }) // Sort by creation date in reverse order
    .skip(skip)
    .limit(3)
    .exec();

  let areMoreItemsAvailable = true;
  if (userOrders.length < 3) areMoreItemsAvailable = false;
  console.log("userOrders", userOrders.length, areMoreItemsAvailable);
  if (userOrders.length === 3) userOrders.pop();
  if (req.body.newAccessToken) {
    return res.status(200).send({
      message: userOrders,
      newAccessToken: req.body.newAccessToken,
      areMoreItemsAvailable,
    });
  } else {
    return res.status(200).send({ message: userOrders });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    console.log(req.user);
    req.user.orderSuccessful = false;
    await req.user.save();
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server error" });
  }
};
