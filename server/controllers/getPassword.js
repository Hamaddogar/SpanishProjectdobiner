const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let data = jwt.verify(token, process.env.SECRET);
  let user = data._id;

  console.log(user);
  User.findOneAndUpdate({ user, req.body})
    .select("email password username avatar")
    .then(data => {
      let match = bcrypt.compareSync(req.body.password, data.password);

      if (match) {
        console.log(true);
        true;
      } else {
        false;
        console.log(false);
      }
    })
    .catch(err => {});
};
