const User = require("../models/user.js");
const Topic = require("../models/topic.js");
const Opinion = require("../models/opinion.js");
const Comment = require("../models/comment.js");
const Bluebird = require("bluebird");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let data1 = jwt.verify(token, process.env.SECRET);
  console.log(data1);

  const getUsers = () => {
    return new Promise(function(resolve, reject) {
      User.find({})
        .lean()
        .then(users => {
          resolve(users);
        });
    });
  };

  getUsers().then(users => {
    Bluebird.map(users, user => {
      return getScore(user._id).then((score, i) => {
        user.score = score.total;
        user.topics = score.topics;
        user.opinions = score.opinions;
        user.comments = score.comments;

        // 				// Rank object
        if (score.total > 10) {
          user.rank = "sophist";
        } else if (score.total > 5) {
          user.rank = "diplomatic";
        } else if (score.total > 3) {
          user.rank = "professor";
        } else {
          user.rank = "peripatetic";
        }

        //

        return user;
      });
    }).then(users => {
      users.sort((a, b) => b.score - a.score);

      users.map(a => (a.ranking = users.indexOf(a) + 1));

      // console.log("scoring >>>>",rank)

      // console.log("users >>>>", users);
      if (req.query.user) {
        let user = users.find(n => n._id.toString() === req.query.user);
        console.log("user", user);
        res.send(user);
      } else {
        res.send(users);
      }
    });
  });

  getScore = userId => {
    return new Promise(function(resolve, reject) {
      let topics = new Promise(function(resolve, reject) {
        Topic.find({ user: userId })
          .count()
          .then(number => {
            resolve(number);
          })
          .catch(err => reject(err));
      });

      let opinions = new Promise(function(resolve, reject) {
        Opinion.find({ user: userId })
          .count()
          .then(number => {
            resolve(number);
          })
          .catch(err => reject(err));
      });

      let comments = new Promise(function(resolve, reject) {
        Comment.find({ user: userId })
          .count()
          .then(number => {
            resolve(number);
          })
          .catch(err => reject(err));
      });

      Promise.all([topics, opinions, comments])
        .then(data => {
          console.log("data", data);
          let total = data.reduce((t, i) => {
            return t + i;
          });
          resolve({
            topics: data[0],
            opinions: data[1],
            comments: data[2],
            total: total
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};
