const db = require('../db/db');

module.exports.deleteById = (req, res) => {
	console.log('delete');
	if(req.params.id){
		res.status(400).json({"error": "Not have ID for delete item"})
	}
	db.run(
		'DELETE FROM Notes WHERE id = ?',
		req.params.id,
		function (err, result) {
			if (err){
				res.status(400).json({"error": res.message})
				return;
			}
			res.status(201).json({"message":"deleted", changes: this.changes})
	});
}