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
  let token = req.headers.authorization.split(" ")[1];
  let data = jwt.verify(token, process.env.SECRET);
  let user = data._id;
  console.log(token);

  cloudinary.uploader
    .upload(dataUri.content)
    .then(cloudinaryPhoto => {
      req.body.avatar = cloudinaryPhoto.secure_url;
      User.findByIdAndUpdate(user, req.body).then(data => {
        let obj = data.toObject();
        let token = jwt.sign(obj, process.env.SECRET);
        res.send(token);
      });
    })
    .catch(err => {
      err.send(false);
    });
};
