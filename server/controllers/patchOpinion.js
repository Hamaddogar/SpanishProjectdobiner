const Opinion = require("../models/opinion.js");

module.exports = (req, res) => {
  Opinion.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};
