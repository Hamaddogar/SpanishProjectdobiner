const express = require("express");
const router = express.Router();
var bcrypt = require("bcrypt-nodejs");
const User= require("../models/user");
const UserForgot = require("../models/forgotSceema");

router.post("/resetpassword/:token", function(req, res) {
  UserForgot.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function(err, user) {
      if (user) {
        var password = req.body.password;
        bcrypt.hash(password, null, null, function(err, hash) {
          req.body.password = hash;

          User.findOneAndUpdate({ email: user.email }, req.body, function(
            err,
            user
          ) {
            if (user) {
              res.json(user);
            } else {
              res.json(err);
            }
          });
        });
      }
    }
  );
});
module.exports = router;
