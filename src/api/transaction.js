const router = require("express").Router();
const db = require('../database/db')
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create the "cardsPictures" directory if it doesn't exist
const uploadDirectory = '../public/cardsPictures/';
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
    const transactionType =req.body.transactionType ;

    console.log(transactionType , transactionDate )
    const query2 = "INSERT INTO transactions (transactionDate, transactionType, clientId, productId ) VALUES (?, ?, ?, ? )";

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

const upload1 = multer({ storage });
router.post("/addexchange", upload1.single("image"), async (req, res) => {
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
    const productquiry = "INSERT INTO produitsEchanges (Name, brand, serieNumber1, serieNumber2, category, price) VALUES (?, ?, ?, ?, ?, ?)";

    const currentProductID = await new Promise((resolve, reject) => {
      db.run(productquiry, [Name, brand, serieNumber1, serieNumber2, category, price], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
          console.log('produit ajouté avec succès ' + this.lastID);
        }
      });
    });

    const productName = req.body.productName;
    const cserieNumber1 = req.body.cserieNumber1;
    const cserieNumber2 = req.body.cserieNumber2;
    const cbrand = req.body.cbrand;
    const ccategory = req.body.ccategory;
    const buyPrice = req.body.buyPrice;
    const sellPrice = req.body.sellPrice;
  
    const query3 = "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ) VALUES (?, ?, ?, ?, ? , ? , ?)";
   const stockId =  await new Promise((resolve, reject) => {
    db.run(query3, [productName, cserieNumber1,cserieNumber2, cbrand, ccategory ,buyPrice,sellPrice], function (err) {
      if (err) {
        console.error("Database error:", err.message);
        reject(err);
      } else {
        resolve(this.lastID);
        console.log('produit ajouté avec succès dand le stock ' + this.lastID);
      }
    })

  });

    const transactionDate = req.body.transactionDate;
    const transactionType =req.body.transactionType ;

    console.log(transactionType , transactionDate )
    const query2 = "INSERT INTO transactions (transactionDate, transactionType, clientId, productId ,stockId) VALUES (?, ?, ?, ? , ?)";

    const transactionID = await new Promise((resolve, reject) => {
      db.run(query2, [transactionDate, transactionType, currentClientID, currentProductID , stockId], function (err) {
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

router.get('/getAlltransactions', (req, res) => {
  const query = `
  SELECT t.transactionId, t.transactionDate, t.transactionType,
  c.firstName, c.familyName, c.phoneNumber, c.cardNumber, c.cardPicturePath,
  pe.ExchangeId, pe.Name AS exchangedProductName, pe.brand AS exchangedProductBrand,
  pe.serieNumber1 AS exchangedProductSerieNumber1, pe.serieNumber2 AS exchangedProductSerieNumber2,
  pe.category AS exchangedProductCategory, pe.price AS exchangedProductPrice,
  pv.sellId, pv.Name AS soldProductName,
  pv.serieNumber1 AS soldProductSerieNumber1, pv.serieNumber2 AS soldProductSerieNumber2,
  pv.category AS soldProductCategory, pv.price AS soldProductPrice
FROM transactions AS t
JOIN clients AS c ON t.clientId = c.clientId
LEFT JOIN produitsEchanges AS pe ON t.productId = pe.ExchangeId
LEFT JOIN produitsvendu AS pv ON t.productId = pv.sellId;
  `;
try {

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
}catch(err){
console.log(err)
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

  // router.delete('/deleteTransactions/:transactionId', (req, res) => {
  //   const transactionId = req.params.transactionId;
  //   console.log(transactionId)
  //   // Execute the DELETE query
  //   try {
  //     db.serialize(() => {
  //       db.run('DELETE FROM transactions WHERE transactionId = ?', [transactionId], function (err) {
  //         if (err) {
  //           console.error("Database error:", err.message);
  //           res.status(500).json({ error: "Database error" });
  //           return;
  //         }
  
  //         if (this.changes === 0) {
  //           res.status(404).json({ error: "Transaction not found" });
  //           return;
  //         }
  
  //         db.run('DELETE FROM clients WHERE clientId = (SELECT clientId FROM transactions WHERE transactionId = ?)', [transactionId], function (err) {
  //           if (err) {
  //             console.error("Database error:", err.message);
  //             res.status(500).json({ error: "Database error" });
  //             return;
  //           }
  
  //           db.run('DELETE FROM produitsvendu WHERE productId = (SELECT productId FROM transactions WHERE transactionId = ?)', [transactionId], function (err) {
  //             if (err) {
  //               console.error("Database error:", err.message);
  //               res.status(500).json({ error: "Database error" });
  //               return;
  //             }
  
  //             db.run('DELETE FROM produitsEchanges WHERE exchangeId = (SELECT productId FROM transactions WHERE transactionId = ?)', [transactionId], function (err) {
  //               if (err) {
  //                 console.error("Database error:", err.message);
  //                 res.status(500).json({ error: "Database error" });
  //                 return;
  //               }
  
  //               res.status(200).json({ message: "Transaction and associated records deleted successfully" });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ error: "An error occurred while processing the request" });
  //   }
  // });


  router.delete('/deleteTransactions/:transactionId', (req, res) => {
    const transactionId = req.params.transactionId;
    console.log(transactionId);
    
    try {
      db.serialize(() => {
        db.run('DELETE FROM produitsEchanges WHERE exchangeId = (SELECT productId FROM transactions WHERE transactionId = ?)', [transactionId], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            res.status(500).json({ error: "Database error" });
            return;
          }
          else
          console.log('produitsEchanges supprimer')
          
          db.run('DELETE FROM produitsvendu WHERE sellId = (SELECT productId FROM transactions WHERE transactionId = ?)', [transactionId], function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            }
            else
            console.log('produit supprimer')
            
            db.run('DELETE FROM clients WHERE clientId = (SELECT clientId FROM transactions WHERE transactionId = ?)', [transactionId], function (err) {
              if (err) {
                console.error("Database error:", err.message);
                res.status(500).json({ error: "Database error" });
                return;
              }
              else
              console.log('client supprimer')
              
              db.run('DELETE FROM transactions WHERE transactionId = ?', [transactionId], function (err) {
                if (err) {
                  console.error("Database error:", err.message);
                  res.status(500).json({ error: "Database error" });
                  return;
                }
                else
                console.log('transaction supprimer')
                
                if (this.changes === 0) {
                  res.status(404).json({ error: "Transaction not found" });
                  return;
                }
                
                res.status(200).json({ message: "Transaction and associated records deleted successfully" });
              });
            });
          });
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  });
  
  

module.exports = router;
