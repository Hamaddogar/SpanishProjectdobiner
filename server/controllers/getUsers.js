

const User = require("../models/user.js");

module.exports = (req, res) => {
  User.find({})
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
