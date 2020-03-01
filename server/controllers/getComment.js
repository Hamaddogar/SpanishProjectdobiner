const Comment = require("../models/comment.js");
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {



	Comment.find(req.query).populate('user').then(data => {
		res.send(data)
	})

	// let token = req.headers.authorization.split(' ')[1]
	// let data = jwt.verify(token, process.env.SECRET)
	// let user = data._id
	//
	// Comment.find({user: user}).then(data => {
	// 	res.send(data)
	// })
}

//change to plural

//find comment by query IF statement, else
