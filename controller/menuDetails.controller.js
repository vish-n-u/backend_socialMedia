const Menu = require("../model/menuDetails.model");

exports.allMenuDetails = async (req, res) => {
  console.log("yips");
  try {
    console.log("yips");
    const allMenuDetail = await Menu.find();
    console.log(allMenuDetail);
    return res.status(200).send({ message: allMenuDetail });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server Err" });
  }
};
