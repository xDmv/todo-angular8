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
    var sql = "select * from Notes"
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
	// console.log('add item');
	try {
		// console.log(`body.text: ${body.text}`);
		if(body.text !== ""){
			let user_id = 777;
			let done = 0;
			let important = 0;
			if(body.done === true){ done = 1}
			if(body.important === true){ done = 1}
			// console.log(`done: ${done} important: ${important}`);
			let create_date = moment().format('dd.mm.yyyy HH:mm:ss');
			let params = [user_id, body.text, done, important, create_date, create_date];
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

app.put("/api/notes/:id", urlencodedParser, function (request, response){
	const body = request.body;
	console.log(`put id: ${request.params.id}`)
	if(body.text){
		return response.status(201).json({ status: 'success', message: 'save this data', data: body});
	}
	response.status(401).json({ status: 'error', message: 'have not data'  });
});


app.delete("/api/notes/:id", (req, res, next) => {
	console.log(`delete id: ${req.params.id}`);
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