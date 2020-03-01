const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let data = jwt.verify(token, process.env.SECRET);
  let user = data._id;

  User.findOne({ _id: user })
    .select("email password username avatar")
    .then(data => {
      console.log("data:::::::::::::::::", data);
      console.log("req.body", req.body);
      let match = bcrypt.compareSync(req.body.password, data.password);
      console.log(match);

      if (match) {
        console.log("true");
        let encrypted = bcrypt.hashSync(req.body.newPassword, 10);
        console.log("password", encrypted);
        req.body.password = encrypted;
        console.log("req.body.password", req.body.password);
        data.password = req.body.password;
        console.log("data.password", data.password);
        let obj = data.toObject();
        User.findByIdAndUpdate(user, obj).then(data => {
          let obj = data.toObject();
          let token = jwt.sign(obj, process.env.SECRET);
          res.send(token);
        });
      } else {
        false;
        res.send(false);
      }
    });
};
