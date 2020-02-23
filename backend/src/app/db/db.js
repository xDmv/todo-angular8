// module.exports = {
// 	url : 'здесь будет ваш URL'
// };
module.exports.sqlite = require('sqlite-sync');

module.exports.connectDB = () => {
	return (exports.sqlite.connect('todos.db'));
}

module.exports.initializedDB = () => {
	sqlite.run(`CREATE TABLE IF NOT EXISTS Notes(
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			user_id INTEGER,
			text TEXT,
			complete BLOB,
			important BLOB,
			date_create INTEGER,
			date_update INTEGER
		);`
	);
	sqlite.run(`CREATE TABLE IF NOT EXISTS Users(
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			name TEXT,
			email TEXT,
			password TEXT,
			role_id INTEGER,
			date_create INTEGER,
			date_update INTEGER
		);`
	);
	sqlite.run(`CREATE TABLE IF NOT EXISTS Role(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER, 
			role TEXT,
			comment TEXT,
			date_create INTEGER,
			date_update INTEGER
		);`
	);
}

module.exports.addTodo = (
	user_id, text, complete, important, date_create, date_update
	) => {
		const rezult =	sqlite.insert(Notes, {
			user_id: user_id,
			text: text,
			complete: complete,
			important: important,
			date_create: date_create,
			date_update: date_update
		});
		return (rezult);
}