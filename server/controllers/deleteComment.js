const Comment = require('../models/comment')

module.exports = (req,res) => {
	Comment.findByIdAndDelete(req.params.id).then(data => {
		 res.send(data)
	})
	.catch(err => {
		res.send(err)
	})

	}
