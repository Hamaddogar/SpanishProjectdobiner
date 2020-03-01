const Category = require('../models/category')

module.exports = (req,res) => {
	Category.create(req.body).then (data =>
	res.send(data)
).catch(err => {
console.log(err)})
}
