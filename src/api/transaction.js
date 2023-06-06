const router = require("express").Router();
const db = require("../database/db");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: 'dl6cgkspe', 
  api_key: '441269869575591', 
  api_secret: 'TvMDOLcRxfHmBNtqv7H-eEtjqmM' 
});

// Create the "cardsPictures" directory if it doesn't exist
const uploadDirectory = "../public/cardsPictures/";
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
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
    const CloudinaryimagePath = cloudinaryUpload.secure_url;
    console.log(CloudinaryimagePath)
    const { firstName, familyName, phoneNumber, cardNumber } = req.body;
    const imagePath = `cardsPictures/${req.file.filename}`;
    const query =
      "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath ,cardPathCloud) VALUES (?, ?, ?, ?, ? , ?)";

    const currentClientID = await new Promise((resolve, reject) => {
      db.run(
        query,
        [firstName, familyName, phoneNumber, cardNumber, imagePath ,CloudinaryimagePath],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log("Client ajouté avec succès");
          }
        }
      );
    });

    const Name = req.body.Name;
    const brand = req.body.brand;
    const serieNumber1 = req.body.serieNumber1;
    const serieNumber2 = req.body.serieNumber2;
    const category = req.body.category;
    const price = req.body.price;
    const productState = req.body.productState
    console.log(Name, brand, price);
    const productquiry =
      "INSERT INTO produitsachetes (Name, brand, serieNumber1, serieNumber2, category, price ,productState) VALUES (?, ?, ?, ?, ?, ? , ?)";

    const currentProductID = await new Promise((resolve, reject) => {
      db.run(
        productquiry,
        [Name, brand, serieNumber1, serieNumber2, category, price ,productState ],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log("produit ajouté avec succès" + this.lastID);
          }
        }
      );
    });

    const query3__stock =
    "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ,productState ) VALUES (?, ?, ?, ?, ? , ? , ?, ?)";
  const stockId = await new Promise((resolve, reject) => {
    db.run(
      query3__stock,
      [
        req.body.Name,
        req.body.serieNumber1,
        req.body.serieNumber2,
        req.body.brand,
        req.body.category,
        req.body.price,
        req.body.price*1.3,
        req.body.productState
      ],
      function (err) {
        if (err) {
          console.error("Database error:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
          console.log(
            "produit ajouté avec succès dans le stock " + this.lastID
          );
        }
      }
    );
  });

    const transactionDate = req.body.transactionDate;
    const transactionType = req.body.transactionType;

    console.log(transactionType, transactionDate);
    const query2 =
      "INSERT INTO transactions (transactionDate, transactionType, clientId, productId,stockId  ) VALUES (?, ?, ?, ? ,?)";

    const transactionID = await new Promise((resolve, reject) => {
      db.run(
        query2,
        [transactionDate, transactionType, currentClientID, currentProductID,stockId ],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log("transaction ajoutée avec succès");
            console.log(
              "client :" + currentClientID,
              "product :" + currentProductID
            );
          }
        }
      );
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
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
    const CloudinaryimagePath = cloudinaryUpload.secure_url;
    console.log(CloudinaryimagePath)
    const { firstName, familyName, phoneNumber, cardNumber } = req.body;
    const imagePath = `cardsPictures/${req.file.filename}`;
    const query =
      "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath ,cardPathCloud) VALUES (?, ?, ?, ?, ? , ?)";

    const currentClientID = await new Promise((resolve, reject) => {
      db.run(
        query,
        [firstName, familyName, phoneNumber, cardNumber, imagePath ,CloudinaryimagePath],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log("Client ajouté avec succès");
          }
        }
      );
    });


    const Name = req.body.Name;
    const brand = req.body.brand;
    const serieNumber1 = req.body.serieNumber1;
    const serieNumber2 = req.body.serieNumber2;
    const category = req.body.category;
    const price = req.body.price;
    const productState = req.body.productState 
    console.log(Name, brand, price);
    const productquiry =
      "INSERT INTO produitsEchanges (Name, brand, serieNumber1, serieNumber2, category, price ,productState ) VALUES (?, ?, ?, ?, ?, ? , ?)";

    const currentProductID = await new Promise((resolve, reject) => {
      db.run(
        productquiry,
        [Name, brand, serieNumber1, serieNumber2, category, price ,productState],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log("produit ajouté avec succès " + this.lastID);
          }
        }
      );
    });

    const productName = req.body.productName;
    const cserieNumber1 = req.body.cserieNumber1;
    const cserieNumber2 = req.body.cserieNumber2;
    const cbrand = req.body.cbrand;
    const ccategory = req.body.ccategory;
    const buyPrice = req.body.buyPrice;
    const sellPrice = req.body.sellPrice;

    const query3 =
      "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ,productState ) VALUES (?, ?, ?, ?, ? , ? , ? , ?)";
    const stockId = await new Promise((resolve, reject) => {
      db.run(
        query3,
        [
          productName,
          cserieNumber1,
          cserieNumber2,
          cbrand,
          ccategory,
          buyPrice,
          sellPrice,
          productState
        ],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log(
              "produit ajouté avec succès dans le stock " + this.lastID
            );
          }
        }
      );
    });

    const transactionDate = req.body.transactionDate;
    const transactionType = req.body.transactionType;

    console.log(transactionType, transactionDate);
    const query2 =
      "INSERT INTO transactions (transactionDate, transactionType, clientId, productId ,stockId) VALUES (?, ?, ?, ? , ?)";

    const transactionID = await new Promise((resolve, reject) => {
      db.run(
        query2,
        [
          transactionDate,
          transactionType,
          currentClientID,
          currentProductID,
          stockId,
        ],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
            console.log("transaction ajoutée avec succès");
            console.log(
              "client :" + currentClientID,
              "product :" + currentProductID
            );
          }
        }
      );
    });

    res.json({ id: transactionID });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/getAlltransactions", (req, res) => {
  const query = `
  SELECT t.transactionId, t.transactionDate, t.transactionType,
  c.firstName, c.familyName, c.phoneNumber, c.cardNumber, c.cardPicturePath,c.cardPathCloud,
  pe.ExchangeId, pe.Name AS exchangedProductName, pe.brand AS exchangedProductBrand,
  pe.serieNumber1 AS exchangedProductSerieNumber1, pe.serieNumber2 AS exchangedProductSerieNumber2,
  pe.category AS exchangedProductCategory, pe.price AS exchangedProductPrice,
  pv.sellId, pv.Name AS soldProductName,
  pv.serieNumber1 AS soldProductSerieNumber1, pv.serieNumber2 AS soldProductSerieNumber2,
  pv.category AS soldProductCategory, pv.price AS soldProductPrice
FROM transactions AS t
JOIN clients AS c ON t.clientId = c.clientId
LEFT JOIN produitsEchanges AS pe ON t.productId = pe.ExchangeId
LEFT JOIN produitsachetes AS pv ON t.productId = pv.sellId;
  `;
  try {
    db.all(query, [], (err, rows) => {
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




router.delete("/deleteTransactions/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;
  console.log(transactionId);
  if (transactionId === -1) {
    res.status(400).json({ error: "Invalid transactionId" });
    return;
  }

  try {
    db.serialize(() => {
      db.get(
        "SELECT transactionType FROM transactions WHERE transactionId = ?",
        [transactionId],
        function (err, row) {
          if (err) {
            console.error("Database error:", err.message);
            res.status(500).json({ error: "Database error" });
            return;
          }

          if (!row) {
            res.status(404).json({ error: "Transaction not found" });
            return;
          }

          if (row.transactionType === "Echange") {
            deleteProduitsEchanges();
            deleteProduitsStock();
          } else if (row.transactionType === "Achat") {
            deleteproduitsachetes();
            deleteProduitsStock()
          } else {
            deleteClient();
          }
        }
      );

      function deleteProduitsEchanges() {
        db.run(
          "DELETE FROM produitsEchanges WHERE exchangeId = (SELECT productId FROM transactions WHERE transactionId = ?)",
          [transactionId],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("ProduitsEchanges deleted");
              deleteClient();
            }
          }
        );
      }
      
      function deleteProduitsStock() {
        db.run(
          "DELETE FROM stock WHERE productId = (SELECT stockId FROM transactions WHERE transactionId = ?)",
          [transactionId],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Produits  supprimer dans le stock");
              
            }
          }
        );
      }


      function deleteproduitsachetes() {
        db.run(
          "DELETE FROM produitsachetes WHERE sellId = (SELECT productId FROM transactions WHERE transactionId = ?)",
          [transactionId],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("produitsachetes deleted");
              deleteClient();
            }
          }
        );
      }

      function deleteClient() {
        db.run(
          "DELETE FROM clients WHERE clientId = (SELECT clientId FROM transactions WHERE transactionId = ?)",
          [transactionId],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Client deleted");
              deleteTransaction();
            }
          }
        );
      }

      function deleteTransaction() {
        db.run(
          "DELETE FROM transactions WHERE transactionId = ?",
          [transactionId],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Transaction deleted");

              if (this.changes === 0) {
                res.status(404).json({ error: "Transaction not found" });
                return;
              }

              res.status(200).json({
                message: "Transaction and associated records deleted successfully",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
   



const upload2 = multer({ storage });
router.patch("/updateTransaction/:transactionId",upload2.single("image"),async (req, res) => {
  const transactionId = req.params.transactionId;
  const transactionType = req.body.transactionType;
  const transactionDate = req.body.transactionDate;
  const productState =req.body.productState
  const imagePath = `cardsPictures/${req.file.filename}`;



  console.log(transactionId);
  if (transactionId === -1) {
    res.status(400).json({ error: "Invalid transactionId" });
    return;
  }

  try {
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
    const CloudinaryimagePath = cloudinaryUpload.secure_url;
    console.log(CloudinaryimagePath)
  
    db.serialize(() => {

      db.run(
        "UPDATE transactions SET transactionDate = ? WHERE transactionId = ?",
        [transactionDate, transactionId],
        function (err) {
          if (err) {
            console.error("Database error:", err.message);
            res.status(500).json({ error: "Database error" });
            return;
          } else {
            console.log("Transaction");
            updateClient();
            if (transactionType === "Echange") {
              updateProduitsEchanges();
              updateStock();
            } else {
              updateproduitsachetes();
              updateStock2();
            }
            res.status(200).json({
              message:
                "Transaction and associated records updated successfully",
            });
          }
        }
      );
      
    
console.log(CloudinaryimagePath)
      

      function updateStock() {
        db.run(
          "UPDATE stock SET productName = ?, serieNumber1 = ?, serieNumber2 = ?, brand = ?, category = ?, buyPrice = ?, sellPrice = ? ,productState = ? WHERE productId = (SELECT stockId FROM transactions WHERE transactionId = ?)",
          [
            req.body.productName,
            req.body.cserieNumber1,
            req.body.cserieNumber2,
            req.body.cbrand,
            req.body.ccategory,
            req.body.buyPrice,
            req.body.sellPrice,
            productState,
            transactionId,
          ],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Produits  modifier dans le stock");
              
            }
          }
        );
      }

      function updateStock2() {
        db.run(
          "UPDATE stock SET productName = ?, serieNumber1 = ?, serieNumber2 = ?, brand = ?, category = ?, buyPrice = ?, sellPrice = ? ,productState = ? WHERE productId = (SELECT stockId FROM transactions WHERE transactionId = ?)",
          [
            req.body.Name,
            req.body.serieNumber1,
            req.body.serieNumber2,
            req.body.brand,
            req.body.category,
            req.body.price,
            req.body.price*1.3,
            productState,
            transactionId,
          ],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Produits  modifier dans le stock");
              
            }
          }
        );
      }

      function updateproduitsachetes() {
        db.run(
          "UPDATE produitsachetes SET Name = ?, brand = ?, serieNumber1 = ?, serieNumber2 = ?, category = ?, price = ? ,productState = ?  WHERE sellId = (SELECT productId FROM transactions WHERE transactionId = ?)",
          [
            req.body.Name,
            req.body.brand,
            req.body.serieNumber1,
            req.body.serieNumber2,
            req.body.category,
            req.body.price,
            productState,
            transactionId,
          ],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("produits achetes updated");
              
            }
          }
        );
      }
      
      function updateProduitsEchanges() {
        db.run(
          "UPDATE produitsEchanges SET Name = ?, brand = ?, serieNumber1 = ?, serieNumber2 = ?, category = ?, price = ?, productState = ? WHERE exchangeId = (SELECT productId FROM transactions WHERE transactionId = ?)",
          [
            req.body.Name,
            req.body.brand,
            req.body.serieNumber1,
            req.body.serieNumber2,
            req.body.category,
            req.body.price,
            productState,
            transactionId,
          ],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Produits Echanges modified");
              console.log( 
                req.body.Name,+"  "+ 
                req.body.brand +"  "+ 
                req.body.serieNumber1+"  "+ 
                req.body.serieNumber2+"  "+ 
                req.body.category+"  "+ 
                req.body.price+"  "+ 
                productState+"  "+ 
                transactionId+"  ")
            }
          }
        );
      }


      function updateClient() {
        db.run(
            "UPDATE clients SET firstName = ?, familyName = ?, phoneNumber = ?, cardNumber = ?, cardPicturePath = ? , cardPathCloud =?  WHERE clientId = (SELECT clientId FROM transactions WHERE transactionId = ?)",
            [
              req.body.firstName,
              req.body.familyName,
              req.body.phoneNumber,
              req.body.cardNumber,
              imagePath,
              CloudinaryimagePath,
              transactionId,
            ],
          function (err) {
            if (err) {
              console.error("Database error:", err.message);
              res.status(500).json({ error: "Database error" });
              return;
            } else {
              console.log("Client updated");
            }
          }
        );
      }


    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
 
module.exports = router;
