const menuController = require("../controller/menuDetails.controller");

const menuRoute = (app) => {
  console.log("reached here");
  app.get("/socialMedia/api/v1/menuDetails", menuController.allMenuDetails);
};
module.exports = menuRoute;
