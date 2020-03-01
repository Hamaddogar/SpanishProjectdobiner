const mongoose = require("mongoose");

const Category = mongoose.model("category", {
  label: {
    type: String,
    required: [true, "Text required"]
  },
  image: {
    type: String,
    required: [true, "Please select an image"],
    default:
      "https://res.cloudinary.com/dgcwi4h6n/image/upload/v1578257183/davisco-5E5N49RWtbA-unsplash_vp8svn.jpg"
  }
});

module.exports = Category;
