const path = require('path');
// const { google } = require('googleapis');
// const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
// const credentials = {
//   client_id: '668281683453-7r4r69tlaqfebkgmdpnslkq98abv824f.apps.googleusercontent.com',
//   client_secret: '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',
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
// };
// // Create a new instance of the Google Drive API client
// const authClient = new google.auth.OAuth2(credentials.client_id, credentials.client_secret);
// authClient.setCredentials({
//   access_token: credentials.access_token,
//   refresh_token: credentials.refresh_token,
// });

// const fileId = '1xphOYqFAr6I-hw2e9b11D4CVmZnmx2pL';
// const databaseFilePath =  path.resolve(__dirname, '../../public/database.db');

// // Download the SQLite database file from Google Drive
// async function downloadDatabaseFile() {
//   const drive = google.drive({ version: 'v3', auth: authClient });
//   const dest = fs.createWriteStream(databaseFilePath);

//   await drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' })
//     .then(res => {
//       res.data
//         .on('end', () => {
//           console.log('Download completed.');
//           accessDatabase();
//         })
//         .on('error', err => {
//           console.error('Error during download.', err);
//         })
//         .pipe(dest);
//     })
//     .catch(err => {
//       console.error('Error retrieving file from Google Drive.', err);
//     });
// }
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: process.env.Port
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Perform database operations...

// Close the connection when finished
connection.end();


const dbPath = path.resolve(__dirname, '../../public/db.db'); // Provide the correct absolute path here

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Connected to the SQLite database.');
});
// downloadDatabaseFile();

module.exports = db;
