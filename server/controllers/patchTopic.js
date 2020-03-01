const Topic = require("../models/topic.js");

module.exports = (req, res) => {
  Topic.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};
