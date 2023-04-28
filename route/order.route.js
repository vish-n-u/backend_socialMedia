const verifyJwt = require("../validation/verifyJwt");
const orderValidation = require("../validation/order.validation");
const orderController = require("../controller/order.controller");

const orderRoute = (app) => {
  app.post(
    "/socialMedia/api/v1/order",
    [verifyJwt.verifyJwt, orderValidation.validateCreateOrder],
    orderController.createOrder
  );
  app.post(
    "/socialMedia/api/v1/orders",
    [verifyJwt.verifyJwt],
    orderController.getAllOrders
  );
};

module.exports = orderRoute;
