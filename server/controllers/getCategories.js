const Category = require("../models/category.js");

module.exports = (req, res) => {
  Category.find({})
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
