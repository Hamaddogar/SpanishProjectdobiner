const Opinion = require('../models/opinion')

module.exports = (req,res) => {
	Opinion.findByIdAndDelete(req.params.id).then(data => {
		 res.send(data)
	})
	.catch(err => {
		res.send(err)
	})

	}
