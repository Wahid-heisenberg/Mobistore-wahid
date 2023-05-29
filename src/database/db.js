const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../../public/db.db'); // Provide the correct absolute path here

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Connected to the SQLite database.');
});

module.exports = db;
