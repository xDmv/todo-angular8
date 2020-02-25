const express         = require('express');
const bodyParser   = require('body-parser');
const moment        = require('moment');
const app                = express();
const db                  = require('../src/app/db/db');
const port = 4250;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());


app.get("/", function (request, response) {
	console.log(request.body);
	console.log('get api test');
	response.status(200).json({data: `Not found!`, status: false});
});

app.get("/api/notes", (req, res, next) => {
		var sql = "Select * From Notes"
		var params = []
		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).json({"error":err.message});
				return;
			}
			res.status(201).json({
				"message":"success",
				"data":rows
			})
		});
});

app.get("/api/notes/:id", function (request, response) {
	console.log(request.body);
	console.log('get api test');
	response.status(200).json({data: 'not found id'});
});

app.post("/api/notes", urlencodedParser, function (request, response) {
	const body = request.body;
	try {
		if(body.text !== ""){
			let create_date = moment().format('DD-MM-YYYY HH:mm:ss');
			let data = {
				user_id: 777,
				text: body.text,
				done: 0,
				important: 0,
				date_create: create_date,
				date_update: create_date
			}
			let params = [data.user_id, data.text, data.done, data.important, create_date, create_date];
			let sql_add = `INSERT INTO Notes (user_id, text, done, important, date_create, date_update) VALUES ( ?, ?, ?, ?, ?, ?)`;
			db.run(sql_add, params, function (err, result) {
					if (err){
						response.status(401).json({"error": err.message})
						return;
					}
					response.status(201).json({ "message": "success", "id" : this.lastID });
				}
			);
		}
	}
	catch (err) { 
		return response.status(400).json({ error: err.message });
	}
});

app.put("/api/notes/:id", (req, res)=>{
	const body = req.body;
	console.log(`patch id: ${req.params.id}`)
	if(body.text){
		let done = body.done === true? 1:0;
		let important = body.important === true? 1:0;
		let update_date = moment().format('DD-MM-YYYY HH:mm:ss');
		let data = {
			user_id: 777,
			text: body.text,
			done: done,
			important: important,
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
});


app.delete("/api/notes/:id", (req, res, next) => {
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
})


app.listen(port);