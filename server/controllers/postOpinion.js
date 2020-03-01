const Opinion = require("../models/opinion");

module.exports = (req, res) => {
  Opinion.create(req.body)
    .then(data => {
      console.log("........................", data);
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
