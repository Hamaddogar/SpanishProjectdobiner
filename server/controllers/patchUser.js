const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log("hola");
  let token = req.headers.authorization.split(" ")[1];
  let data = jwt.verify(token, process.env.SECRET);
  let user = data._id;

  User.findByIdAndUpdate(user, req.body)
    .then(data => {
      let obj = data.toObject();
      let token = jwt.sign(obj, process.env.SECRET);
      res.send(token);
    })
    .catch(err => res.send(err));
};
