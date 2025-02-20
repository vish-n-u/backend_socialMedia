const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const bodyParser = require("body-parser");

const DB_URL = require("./config/db.config");
const { port, Origin } = require("./config/server.config");
const orderRoute = require("./route/order.route");
const userRoute = require("./route/user.route");
const authUser = require("./route/authenticateUser.route");
const menuRoute = require("./route/menuDetails.route");
const menuModel = require("./model/menuDetails.model");
console.log("Origin", Origin.length);
origin = Origin.split(",");
console.log(origin.length, origin);
const app = express();
const corsOptions = {
  origin: origin, // allow requests from this domain
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
app.get("/working", (req, res) => {
  res.status(200).send("seemsToBeWorking...ig!");
});
app.get("/socialMedia/api/v1/swiggyMenu",(req,res)=>{
  const filePath = path.join(__dirname, "utils", "swiggyMenuApi.json"); 
  res.sendFile(filePath);
})

async function connectDb() {
  const conn = await mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on("error", () => {
    console.log("#### Error while connecting to mongoDB ####");
  });
  db.once("open", () => {
    console.log("#### Connected to mongoDB ####");
  });

  userRoute(app);
  authUser(app);
  orderRoute(app);
  menuRoute(app);

  app.listen(port, () => {
    console.log("listening...");
  });
}
connectDb();
