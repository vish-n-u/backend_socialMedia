if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

secretKey = process.env.SECRET_KEY;
module.exports = secretKey;
