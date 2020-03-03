const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser   = require('body-parser');

const get = require('./app/middleware/get');
const add = require('./app/middleware/create');
const update = require('./app/middleware/update');
const del = require('./app/middleware/delete');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/notes/test', (req,res)=>{
  res.status(200).json({'status API':  true, 'version': '1.0.0'})
});

app.get("/api", function (req, res) {
	res.status(400).json({data: `Not found!`, status: false});
});

app.get("/api/notes", (req, res) => {
	get.getAll(req, res);
});

// app.get("/api/notes/:id", (req, res) => {
// 	get.getByID(req, res);
// });

app.post("/api/notes", urlencodedParser, (req, res) => {
	add.create(req, res);
});

app.put("/api/notes/:id", urlencodedParser, (req, res) => {
	update.up(req, res);
});

app.delete("/api/notes/:id", urlencodedParser, (req, res) => {
	del.deleteById(req, res);
})

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
