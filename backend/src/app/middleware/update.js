const db = require('../db/db');
const moment = require('moment');

module.exports.up = (req, res) => {
	console.log('up');
	const body = req.body;
	if(body.text){
		let update_date = moment().format('DD-MM-YYYY HH:mm:ss');
		let data = {
			user_id: 777,
			text: body.text,
			done: body.done,
			important: body.important,
			date_update: update_date
		}
		let params = [data.user_id, data.text, data.done, data.important, data.date_update, req.params.id];
		let sql = `UPDATE Notes set 
		user_id = COALESCE(?,user_id), 
		text = COALESCE(?,text), 
		done = COALESCE(?,done), 
		important = COALESCE(?,important), 
		date_update = COALESCE(?,date_update)
		WHERE id = ?`;
		db.run( sql, params, function (err, result) {
			if (err){
				res.status(401).json({"error": res.message});
				return;
			}
				res.status(201).json({
				message: "success",
				data: data,
				changes: this.changes
			})
		});
	}
}