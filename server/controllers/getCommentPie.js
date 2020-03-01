const Comment = require("../models/comment.js");
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	let data = jwt.verify(token, process.env.SECRET)
	let user = data._id

	Comment.find({user: user}).then(data => {
		res.send(data)
	})
}
