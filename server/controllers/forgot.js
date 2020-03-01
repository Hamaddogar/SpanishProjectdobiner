const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
const  UserForgot = require('../models/forgotSceema');


router.post('/forgot', function (req, res, next) {
    async.waterfall([
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        var userForgot = new UserForgot();
  
        userForgot.resetPasswordToken = token;
        userForgot.resetPasswordExpires = Date.now() + 3600000;
        userForgot.email = req.body.email;
  
        userForgot.save(function (err) {
          done(err, token, userForgot);
        });
  
      },
      function (token, userForgot, done) {
        var smtpTransport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "debatimoscode@gmail.com",
            pass: "hammad123"
          }
        });
  
        var mailOptions = {
          to: userForgot.email,
          from: 'debatimoscode@gmail.com',
          subject: 'No Reply  (debatimos)',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:3000/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          res.json('Your e-mail Successfully  has been  sent to ' + userForgot.email + '');
          done(err, 'done');
        });
      }
    ], function (err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
  module.exports=router