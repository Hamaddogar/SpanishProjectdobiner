const Opinion = require("../models/opinion");

module.exports = (req, res) => {
  Opinion.find({ topic: req.params.id })
    .populate("user", "avatar username")
    .lean()
    .then(data => {
      data.sort((a, b) => b.upvoters.length - a.upvoters.length);

      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
