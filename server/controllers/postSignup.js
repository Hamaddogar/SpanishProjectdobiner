const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DataUri = require("datauri");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = (req, res) => {
  let encrypted = bcrypt.hashSync(req.body.password, 10);
  console.log("password", encrypted);
  req.body.password = encrypted;
  User.create(req.body)
    .then(data => {
      let obj = data.toObject();
      let token = jwt.sign(obj, process.env.SECRET);
      console.log("token>>>>>>>>>>>>", token);
      res.send({ token: token });
    })

    .catch(err => {
      console.log("err", err);
    });
};
