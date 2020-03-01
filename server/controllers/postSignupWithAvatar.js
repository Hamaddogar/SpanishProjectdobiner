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

const uri = new DataUri();

module.exports = (req, res) => {
  const dataUri = uri.format("file", req.file.buffer);
  console.log("dataUri", dataUri);
  cloudinary.uploader
    .upload(dataUri.content)
    .then(cloudinaryPhoto => {
      console.log("cloudinaryPhoto", cloudinaryPhoto);
      req.body.avatar = cloudinaryPhoto.secure_url;
      let encrypted = bcrypt.hashSync(req.body.password, 10);
      console.log("password", encrypted);
      req.body.password = encrypted;
      User.create(req.body).then(data => {
        let obj = data.toObject();
        let token = jwt.sign(obj, process.env.SECRET);
        console.log("token>>>>>>>>>>>>", token);
        res.send({ token: token });
      });
    })
    .catch(err => {
      console.log("err", err);
    });
};
