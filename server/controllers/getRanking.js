// decode token and extract user id
// Topics collection and get all topics where user is id .count() // Promise
// Opinions collection and get all opinions where user is id .count()
// Opinions collection and get all opinions where upvoters contains id .count()
// Comments collection and get all comments where upvoters contains id .count()
// let t = new Promise(function(resolve, reject) {
//     Topic.findById(req.params.id).then(data => {
//         console.log(data);
//         resolve(data)
//     }).catch(err => {
//         reject(err)
//     })
// });

// Promise.all([t, opinions]).then(data) // data: [13, 5, 76, 2]
// sum = data.reduce
const User = require("../models/user.js");
const Topic = require("../models/topic.js");
const Opinion = require("../models/opinion.js");
const Comment = require("../models/comment.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let data = jwt.verify(token, process.env.SECRET);
  let user = data._id;
  //had to turn these into promises in order to use Promsie.all
  let topics = new Promise(function(resolve, reject) {
    Topic.find({ user: user })
      .count()
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
  let opinions = new Promise(function(resolve, reject) {
    Opinion.find({ user: user })
      .count()
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
  let comments = new Promise(function(resolve, reject) {
    Comment.find({ user: user })
      .count()
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
  Promise.all([topics, opinions, comments])
    .then(data => {
      let total = data.reduce((t, i) => {
        return t + i;
      });
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>", total);
      res.send({ total: total });
    })
    .catch(err => {
      res.send(err);
    });
};
