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
router.post("/addsell", upload.single("image"), async (req, res) => {
  try {
    const { firstName, familyName, phoneNumber, cardNumber } = req.body;
    const imagePath = `cardsPictures/${req.file.filename}`;
    const query = "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath) VALUES (?, ?, ?, ?, ?)";

    const currentClientID = await new Promise((resolve, reject) => {
      db.run(query, [firstName, familyName, phoneNumber, cardNumber, imagePath], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
          console.log('Client ajouté avec succès');
        }
      });
    });

    const Name = req.body.Name;
    const brand = req.body.brand;
    const serieNumber1 = req.body.serieNumber1;
    const serieNumber2 = req.body.serieNumber2;
    const category = req.body.category;
    const price = req.body.price;
    console.log(Name, brand, price);
    const productquiry = "INSERT INTO produitsvendu (Name, brand, serieNumber1, serieNumber2, category, price) VALUES (?, ?, ?, ?, ?, ?)";

    const currentProductID = await new Promise((resolve, reject) => {
      db.run(productquiry, [Name, brand, serieNumber1, serieNumber2, category, price], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
          console.log('produit ajouté avec succès' + this.lastID);
        }
      });
    });

    const transactionDate = req.body.transactionDate;
    const transactionType = req.body.transactionType;
    const query2 = "INSERT INTO transactions (transactionDate, transactionType, clientId, productId) VALUES (?, ?, ?, ?)";

    const transactionID = await new Promise((resolve, reject) => {
      db.run(query2, [transactionDate, transactionType, currentClientID, currentProductID], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
          console.log('transaction ajoutée avec succès');
          console.log('client :' + currentClientID, 'product :' + currentProductID);
        }
      });
    });

    res.json({ id: transactionID });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});


// var currentClientID = 0
// var currentProductID = 0
// // Handle POST request to "/addsell" route
// router.post("/addsell", upload.single("image"), (req, res) => {

//   try {
//     const { firstName, familyName, phoneNumber, cardNumber } = req.body;
//     console.log(req.body)
//     const imagePath = `cardsPictures/${req.file.filename}`;

//     const query = "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath) VALUES (?, ?, ?, ?, ?)";

//     db.run(query, [firstName, familyName, phoneNumber, cardNumber, imagePath], function (err) {
//       if (err) {
//         console.error("Database error:", err.message);
//         res.status(500).json({ error: "Database error" });
//       } else {
//         res.json({ id: this.lastID });
//         console.log('Client added successfully');
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }

// //   try {
// //     const Name = req.body.Name
// //     const brand = req.body.brand
// //     const serieNumber1=req.body.serieNumber1
// //     const serieNumber2 = req.body.serieNumber2
// //     const category= req.body.category
// //     const price = req.body.price
// //     const producrquiry ="INSERT INTO produitsvendu (Name,brand,serieNumber1,serieNumber2,category,price) VALUES (? ,? ,?,?,?,?)"
// //     db.run(producrquiry, [Name,brand,serieNumber1,serieNumber2,category,price], function (err) {
// //       if (err) {
// //         console.error("Database error:", err.message);
// //         res.status(500).json({ error: "Database error" });
// //       } else {
        
// //          currentProductID = this.lastID
// //         console.log('produit ajouter avec success');
// //       }
// //     });

// //   }catch(err){
// //     console.log(err)
  
// //   }

// //   try {
// //     const transactionDate = req.body.transactionDate
// //     const transactionType = req.body.transactionType
// //     const query2 = "INSERT INTO transactions (transactionDate , transactionType ,clientId ,productId) VALUES (? ,? ,?,?)";
// //     db.run(query2, [transactionDate, transactionType , currentClientID,currentProductID], function (err) {
// //       if (err) {
// //         console.error("Database error:", err.message);
// //         res.status(500).json({ error: "Database error" });
// //       } else {
      
// //         console.log('transaction ajouter avec success');
// //       }
// //     });
// //   }catch(err){
// //     console.log(err)
// // }
// }


// );

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
