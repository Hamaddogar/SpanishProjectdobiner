const Topic = require("../models/topic.js");

module.exports = (req, res) => {
  Topic.findById(req.params.id)
    .populate("category")
    .lean()
    .then(t => {
      {
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
            (t.yesVotes.length / (t.yesVotes.length + t.noVotes.length)) * 100
          );
        }
      }

      res.send(t);
    })
    .catch(err => {
      console.log(err);
    });
};
