if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

port = process.env.PORT;
secretKey = process.env.SECRET_KEY;
module.exports = { secretKey, poer };
