module.exports = function(app, db) {
	app.post('/todo', (req, res) => {
		console.log(req.body);
		res.send('Hello');
	});
};