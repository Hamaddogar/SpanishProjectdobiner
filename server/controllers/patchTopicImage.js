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
  console.log("____________________________________", req.file);
  const dataUri = uri.format("file", req.file.buffer);

  cloudinary.uploader
    .upload(dataUri.content)
    .then(cloudinaryPhoto => {
      req.body.image = cloudinaryPhoto.secure_url;
      Topic.findByIdAndUpdate(req.params.id, req.body).then(data => {
        let obj = data.toObject();
        res.send(data);
      });
    })
    .catch(err => {
      err.send(false);
    });
};
