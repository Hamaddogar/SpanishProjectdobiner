const User = require('../models/user')

module.exports = (req,res) => {
	User.findByIdAndDelete(req.params.id).then(data => {
		 res.send(data)
	})
	.catch(err => {
		res.send(err)
	})

	}
