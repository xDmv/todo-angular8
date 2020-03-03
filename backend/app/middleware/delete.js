const db = require('../db/db');

module.exports.deleteById = (req, res) => {
	console.log('delete');
	const sql = "DELETE FROM Notes WHERE id = ?";
	if( (req.params.id === "") || (req.params.id === undefined)){
		res.status(400).json({"error": "Not have ID for delete item"})
		return
	}
	db.run(
		sql,
		req.params.id,
		function (err, result) {
			if (err){
				res.status(401).json({"error": res.message})
				return;
			}
			res.status(201).json({"message":"deleted", changes: this.changes})
	});
}