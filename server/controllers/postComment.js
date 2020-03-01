const Comment = require('../models/comment')

module.exports = (req, res) => {
  Comment.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
