const Opinion = require("../models/opinion.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let data = jwt.verify(token, process.env.SECRET);
  let user = data._id;

  Opinion.find({ user: user })
    .populate("user")
    .then(data => {
      res.send(data);
    });
};

// module.exports = (req,res) => {
// 	Opinion.find({})
// 	.populate('type')
// 	.populate('amenities')
// 	.populate({path: 'host', select: 'name avatar'})
// 	.lean()
// 	.then(data => {
// 						Opinion.find({place: data._id}).populate('author').then(reviews => {
// 							data.reviews = reviews
// 							res.send(data)
// 						})
// 					})
// 				}
// extracting-information-from-token
