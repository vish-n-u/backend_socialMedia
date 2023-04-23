const authController = require("../controller/authenticateUser.controller");
const verifyJwt = require("../validation/verifyJwt");
const authenticateUserRoute = (app) => {
  app.post(
    "/socialMedia/api/v1/authUser",
    [verifyJwt.verifyJwt],
    authController.verifyUser
  );
};

module.exports = authenticateUserRoute;
