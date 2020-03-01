const Topic = require('../models/topic.js')

module.exports = (req, res) => {
	Topic.findByIdAndDelete(req.params.id).then (data => {
		res.send(data)
	}).catch(err => {
		console.log(err)
	})
}
