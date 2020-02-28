const express         = require('express');
const bodyParser   = require('body-parser');
const app                = express();
const port = 4250;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const get = require('./app/middleware/get');
const add = require('./app/middleware/create');
const update = require('./app/middleware/update');
const del = require('./app/middleware/delete');

app.get("/api", function (request, response) {
	response.status(400).json({data: `Not found!`, status: false});
});

app.get("/api/notes", (req, res) => {
	get.getAll(req, res);
});

app.get("/api/notes/:id", function (req, res) {
	get.getByID(req, res);
});

app.post("/api/notes", urlencodedParser, function (req, res) {
	add.create(req, res);
});

app.put("/api/notes/:id", (req, res)=>{
	update.up(req, res);
});

app.delete("/api/notes/:id", (req, res) => {
	del.deleteById(req, res);
})

app.listen(port);