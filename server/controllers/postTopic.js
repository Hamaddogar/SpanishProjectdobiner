const Topic = require("../models/topic");
const DataUri = require("datauri");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uri = new DataUri();

module.exports = (req, res) => {
  console.log("req.file", req.file);

  const dataUri = uri.format("file", req.file.buffer);

  console.log("dataUri", dataUri);

  cloudinary.uploader
    .upload(dataUri.content)
    .then(cloudinaryPhoto => {
      console.log("cloudinaryPhoto", cloudinaryPhoto.secure_url);
      req.body.image = cloudinaryPhoto.secure_url;
      Topic.create(req.body)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log("err", err);
    });
};
