const db = require('../db/db');

module.exports.deleteById = (req, res) => {
	console.log('delete');
	// const body = reg.body;
	// res.status(201).json({
	// 	'body':  body,
	// 	'param': req.params.id,
	// 	"message": "delete method"
	// })
	if(req.params.id){
		res.status(400).json({"error": "Not have ID for delete item"})
	}
	db.run(
		'DELETE FROM Notes WHERE id = ?',
		req.params.id,
		function (err, result) {
			if (err){
				res.status(401).json({"error": res.message})
				return;
			}
			res.status(201).json({"message":"deleted", changes: this.changes})
	});
}