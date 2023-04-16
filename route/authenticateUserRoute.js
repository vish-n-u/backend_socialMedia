const authController = require("../controller/authenticateUser.controller");

const authenticateUserRoute = (app) => {
  app.post("/socialMedia/api/v1/authUser", authController.verifyUser);
};

module.exports = authenticateUserRoute;
