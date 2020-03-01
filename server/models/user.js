const mongoose = require("mongoose");

const User = mongoose.model("user", {
  avatar: {
    type: String,
    default: "https://randomuser.me/api/portraits/lego/1.jpg"
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = User;
