const mongoose = require("mongoose");

const Comment = mongoose.model("comment", {
  opinion: {
		type: mongoose.Schema.ObjectId,
		ref: "topic"
  },
  user: {
		type: mongoose.Schema.ObjectId,
    ref: "user"
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
  }
});

module.exports = Comment;
