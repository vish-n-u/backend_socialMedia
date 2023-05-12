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
  const userOrders = await Order.find({ email: req.user.email });

  console.log(userOrders, "userOrders:----", userOrders);
  if (req.body.newAccessToken) {
    return res
      .status(200)
      .send({ message: userOrders, newAccessToken: req.body.newAccessToken });
  } else {
    return res.status(200).send({ message: userOrders });
  }
};
