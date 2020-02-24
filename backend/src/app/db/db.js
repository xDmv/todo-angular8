const moment        = require('moment');
const md5 = require('md5');
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('notes.db', (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Connected to the SQLite database.');
		db.run(`CREATE TABLE IF NOT EXISTS Notes(
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			user_id INTEGER,
			text TEXT,
			complete INTEGER,
			important INTEGER,
			date_create TEXT,
			date_update TEXT
		);`);
		(err) => {
            if (err) {
                // Table already created
            }else{
				let create_date = moment().format('dd.mm.yyyy HH:mm:ss');
				let insertNote = `INSERT INTO Notes (user_id, text, complete, important, date_create, date_update) VALUES ( 911, 'Testing data', 0, 0, ${create_date}, ${create_date})`;
				db.run(insertNote);
			}
		}
	}
});

module.exports = db;