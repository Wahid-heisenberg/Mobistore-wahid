const path = require('path');
// const { google } = require('googleapis');
// const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();


const mysql = require('mysql2');
const dotenv = require('dotenv').config ({path:__dirname + '/.env'})

// console.log(process.env.DB_HOST)
// Create a connection to the MySQL database
const connection =mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD ,
  database:  process.env.DB_DBNAME,
  waitForConnections: true,
  connectTimeout: 999999999999999, 
});


// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  else
  console.log('Connected to MySQL successfully');
});


// Perform database operations...

// Close the connection when finished



// const dbPath = path.resolve(__dirname, '../../public/db.db'); // Provide the correct absolute path here

// const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Connected to the SQLite database.');
// });
// downloadDatabaseFile();

module.exports = {
  connection: connection.promise()
};
