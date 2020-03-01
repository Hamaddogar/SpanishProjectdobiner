const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	console.log(req.headers.authorization);
	let token = req.headers.authorization.split(' ')[1]
	console.log(token);
	let data = jwt.verify(token, process.env.SECRET)
	res.send(data)
}
