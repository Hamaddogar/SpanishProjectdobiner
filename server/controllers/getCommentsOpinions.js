const Comment = require("../models/comment");

module.exports = (req, res) => {
  Comment.find({ opinion: req.params.id })
    .populate("user", "avatar username")
    .lean()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
