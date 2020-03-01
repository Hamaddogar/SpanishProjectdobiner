const Opinion = require("../models/opinion.js");

module.exports = (req, res) => {
  Opinion.find({})
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
