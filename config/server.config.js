require("dotenv").config();

port = process.env.PORT || 3000;
secretKey = process.env.SECRET_KEY;
refreshKey = process.env.REFRESH_SECRET_KEY;
module.exports = { secretKey, port, refreshKey };
