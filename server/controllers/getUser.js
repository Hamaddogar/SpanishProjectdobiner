
const User = require("../models/user.js");

module.exports = (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
