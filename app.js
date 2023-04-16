const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./route/user.route");
const authUser = require("./route/authenticateUserRoute");
const bodyParser = require("body-parser");
const DB_URL = require("./config/db.config");
const app = express();
const MAX_FILE_SIZE = 1024 * 1024;
const corsOptions = {
  origin: "http://localhost:3001", // allow requests from this domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow these methods
  allowedHeaders: ["Content-Type"], // allow these headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("reached");
});
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("#### Error while connecting to mongoDB ####");
});
db.once("open", () => {
  console.log("#### Connected to mongoDB ####");
});
userRoute(app);
authUser(app);

app.listen("3000", () => {
  console.log("listening...");
});
