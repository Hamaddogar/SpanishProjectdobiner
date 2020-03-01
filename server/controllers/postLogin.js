const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log("req.body.username", req.body.username);
  User.findOne({ username: req.body.username })
    .select("email password username avatar")
    .then(data => {
      console.log("data", data);
      let match = bcrypt.compareSync(req.body.password, data.password);
      console.log(match);
      if (match) {
        let obj = data.toObject();
        let token = jwt.sign(obj, process.env.SECRET);
        res.send({ token });
      }
    })
    .catch(err => {
      console.log("err", err);
    });
};
