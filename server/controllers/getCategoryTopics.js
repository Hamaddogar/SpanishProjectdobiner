const Topic = require("../models/topic.js");

module.exports = (req, res) => {
  Topic.find({ category: req.params.id })
    .populate("category")
    .populate("user")
    .lean()
    .then(topic => {
      topic.sort((a, b) => b.created - a.created);

      topic.map(t => {
        if (t.yesVotes.length + t.noVotes.length == 0) {
          t.side = "";
          t.percentage = 0;
        } else if (t.yesVotes.length == t.noVotes.length) {
          t.side = "Tie";
          t.percentage = 50;
        } else if (t.yesVotes.length > t.noVotes.length) {
          t.side = "Pro";
          t.percentage = Math.round(
            (t.yesVotes.length / (t.yesVotes.length + t.noVotes.length)) * 100
          );
        } else if (t.yesVotes.length < t.noVotes.length) {
          t.side = "Con";
          t.percentage = Math.round(
            (t.noVotes.length / (t.yesVotes.length + t.noVotes.length)) * 100
          );
        }
      });

      res.send(topic);
    })
    .catch(err => {
      res.send(err);
    });
};
