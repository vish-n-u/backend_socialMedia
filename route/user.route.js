const bodyParser = require("body-parser");

const userController = require("../controller/user.controller");
const userValidation = require("../validation/user.validation");

const userRoute = (app) => {
  app.post(
    "/socialMedia/api/v1/register",

    [userValidation.registrationValidation],
    userController.registration
  );
  app.post(
    "/socialMedia/api/v1/login",
    [userValidation.validateLogin],
    userController.login
  );
  app.delete(
    "/socialMedia/api/v1/delete",

    userController.deleteRegistration
  );
  app.post(
    "/socialMedia/api/v1/registerGoogle",
    [userValidation.validateGoogleSignIn],
    userController.verify
  );
};

module.exports = userRoute;
