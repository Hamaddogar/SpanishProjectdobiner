const mongoose = require("mongoose");

const Opinion = mongoose.model("opinion", {
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: "topic"
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: [true, "Text required"]
  },
  text: {
    type: String,
    required: [true, "Text required"]
  },
  upvoters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  side: {
    type: String,
    required: [true, "Side required"]
  }
});

module.exports = Opinion;
