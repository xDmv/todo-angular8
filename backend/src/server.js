const express          = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser   = require('body-parser');
const app                = express();
const http = require("http");
const db = require('../src/app/db/db');
const router = express.Router();
// require('./app/routes')(app, {});

const port = 8000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// MongoClient.connect(db.url, (err, database) => {
// 	if (err) return console.log(err)
// 	require('./app/routes')(app, database);

// 	app.listen(port, () => {
// 		console.log('We are live on ' + port);
// 	});
// })

// app.get("/api", function (request, response) {
// 	console.log(request.body);
// 	console.log('get api test');
// 	response.status(404).send(`Ресурс не найден!`);
// 	// response.sendStatus(404);
// });

app.post("/api/post", urlencodedParser, function (request, response) {
	console.log('post')
	if (!request.body.userName) return (response.status(404).json({error: "Invalid POST"}) );
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

router.post('/api/post1', async (req, res, next) => {
	const body = req.body;
	try {
		console.log(` Name: ${body.userName} `);
		return res.status(201).json({ complete: 'done' });
	}
	catch (err) { 
		return res.status(400).json({ error: err.message });
	}
});



app.listen(4250);