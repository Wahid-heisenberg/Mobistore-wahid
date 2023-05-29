const router = require("express").Router();
const db = require('../database/db')
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create the "cardsPictures" directory if it doesn't exist
const uploadDirectory = './cardsPictures/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer storage to save files to the "cardsPictures" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Set the destination directory for saving the files
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4(); // Generate a unique file name using uuid
    cb(null, `${uniqueFilename}.png`);
  },
});

// Create the multer middleware
const upload = multer({ storage });

// Handle POST request to "/addsell" route
router.post("/addsell", upload.single("image"), (req, res) => {
  try {
    const { firstName, familyName, phoneNumber, cardNumber } = req.body;
    console.log(req)
    const imagePath = `cardsPictures/${req.file.filename}`;

    const query = "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath) VALUES (?, ?, ?, ?, ?)";

    db.run(query, [firstName, familyName, phoneNumber, cardNumber, imagePath], function (err) {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ id: this.lastID });
        console.log('Client added successfully');
      }
    });
  } catch (err) {
    console.log(err);
  }
});



  

  router.get("/affichertransactions", (req, res) => {
    try {
      const query = "SELECT * FROM transactions";
  
      db.all(query, (err, rows) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json(rows);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  

module.exports = router;
