const express         = require('express');
const bodyParser   = require('body-parser');
const moment        = require('moment');
const app                = express();
const db                  = require('../src/app/db/db');

const router           = express.Router();

const port = 4250;
const urlencodedParser = bodyParser.urlencoded({ extended: false });


// function addNote(
// 	user_id, text, complete, important, date_create, date_update
// ){
// 	let sql = `INSERT INTO Notes VALUES (
// 		user_id: ${user_id},
// 		text: ${text},
// 		complete: ${complete},
// 		important: ${important},
// 		date_create: ${date_create},
// 		date_update: ${date_update}
// 	)`
// 	let rezult_sql = db.prepare(sql);
// }

app.use(bodyParser.json());

app.get("/", function (request, response) {
	console.log(request.body);
	console.log('get api test');
	response.status(200).json({data: `Not found!`, status: false});
	// response.sendStatus(404);
});

app.get("/api", function (request, response) {
	// console.log(request.body);
	console.log('get api test');
	let sql = "select * from Notes;";
	let param = [];
	db.all(sql, param, (err, rows) => {
		if (err) {
			response.status(400).json({"error":err.message});
			return;
		}
		response.json({
			"message":"success",
			"data": rows
		})
	});
	// response.status(200).json({data: 'not found'});
	// response.sendStatus(404);
});

app.get("/api/:id", function (request, response) {
	console.log(request.body);
	console.log('get api test');

	response.status(200).json({data: 'not found id'});
	// response.sendStatus(404);
});

app.post("/api/post", urlencodedParser, function (request, response) {
	const body = request.body;
	try {
		if(body.text){
			let user_id = 666;
			
			console.log(body.text);
			console.log(body.done);
			let done = 0;
			let important = 0;
			if(body.done === true){ done = 1}
			if(body.important === true){ done = 1}
			console.log(`done: ${done} important: ${important}`);
			let create_date = moment().format('dd.mm.yyyy HH:mm:ss');
			let sql = `INSERT INTO Notes (user_id, text, complete, important, date_create, date_update) VALUES ( ${user_id}, ${body.text}, 0, 0, ${create_date}, ${create_date})`;
			let param = [];
			db.run(sql, param, (err, rows) => {
				if (err) {
					response.status(400).json({"error":err.message});
					return;
				}
				response.json({
					"message":"success",
					"data": rows
				})
			});
			// console.log(result);
			// return response.status(201).json({ status: 'success', message: 'save this data', data: body });
		}
		response.status(401).json({ status: 'error', message: 'have not data'  });
	}
	catch (err) { 
		return response.status(400).json({ error: err.message });
	}
});

app.put("/api/put/:id", urlencodedParser, function (request, response){
	const body = request.body;
	console.log(`put id: ${request.params.id}`)
	if(body.text){
		return response.status(201).json({ status: 'success', message: 'save this data', data: body});
	}
	response.status(401).json({ status: 'error', message: 'have not data'  });
});

app.delete('api/delete/:id', urlencodedParser, (request, response) => {
	//	const body = request.body;
	//	console.log(`body: ${body}`);
	console.log(`delete id: ${request.params.id}`);
	// try {
	// 	return response.status(200).json({ status: 'done', message: 'delete this data'});
	// }
	// catch (err) { 
	// 	return response.status(400).json({ error: err.message });
	// }
});


app.listen(port);