const mongoose = require("mongoose");

const Topic = mongoose.model("topic", {
  title: {
    type: String,
    required: [true, "Please enter a title"]
  },
  image: {
    type: String,
    required: [true, "Please select an image"],
    default:
      "https://outline-prod.imgix.net/20181128-rHCVuIxfOKj0KYdVlqkI?auto=format&q=60&w=1280&s=2aecd8ad0c072025a4722113b54141cc"
  },

  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category"
  },
  yesVotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ],
  noVotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ],
  favorites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Topic;
