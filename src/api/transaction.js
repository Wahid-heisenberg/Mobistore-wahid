const router = require("express").Router();
const {connection} = require('../database/db');
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
const uploadDirectory = "./public/cardsPictures/";
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

// const upload = multer({ storage });
// router.post("/addsell", upload.single("image"), async (req, res) => {
//   try {
//     const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
//     const CloudinaryimagePath = cloudinaryUpload.secure_url;
//     console.log(CloudinaryimagePath)
//     const { firstName, familyName, phoneNumber, cardNumber } = req.body;
//     const imagePath = `cardsPictures/${req.file.filename}`;
//     const query =
//       "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath ,cardPathCloud) VALUES (?, ?, ?, ?, ? , ?)";

//     const currentClientID = await new Promise((resolve, reject) => {
//       connection.query(
//         query,
//         [firstName, familyName, phoneNumber, cardNumber, imagePath ,CloudinaryimagePath],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log("Client ajouté avec succès");
//           }
//         }
//       );
//     });

//     const Name = req.body.Name;
//     const brand = req.body.brand;
//     const serieNumber1 = req.body.serieNumber1;
//     const serieNumber2 = req.body.serieNumber2;
//     const category = req.body.category;
//     const price = req.body.price;
//     const productState = req.body.productState
//     console.log(Name, brand, price);
//     const productquiry =
//       "INSERT INTO produitsachetes (Name, brand, serieNumber1, serieNumber2, category, price ,productState) VALUES (?, ?, ?, ?, ?, ? , ?)";

//     const currentProductID = await new Promise((resolve, reject) => {
//      connection.query(
//         productquiry,
//         [Name, brand, serieNumber1, serieNumber2, category, price ,productState ],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log("produit ajouté avec succès" + this.lastID);
//           }
//         }
//       );
//     });

//     const query3__stock =
//     "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ,productState ) VALUES (?, ?, ?, ?, ? , ? , ?, ?)";
//   const stockId = await new Promise((resolve, reject) => {
//    connection.query(
//       query3__stock,
//       [
//         req.body.Name,
//         req.body.serieNumber1,
//         req.body.serieNumber2,
//         req.body.brand,
//         req.body.category,
//         req.body.price,
//         req.body.price*1.3,
//         req.body.productState
//       ],
//       function (err) {
//         if (err) {
//           console.error("Database error:", err.message);
//           reject(err);
//         } else {
//           resolve(this.lastID);
//           console.log(
//             "produit ajouté avec succès dans le stock " + this.lastID
//           );
//         }
//       }
//     );
//   });

//     const transactionDate = req.body.transactionDate;
//     const transactionType = req.body.transactionType;

//     console.log(transactionType, transactionDate);
//     const query2 =
//       "INSERT INTO transactions (transactionDate, transactionType, clientId, productId,stockId  ) VALUES (?, ?, ?, ? ,?)";

//     const transactionID = await new Promise((resolve, reject) => {
//      connection.query(
//         query2,
//         [transactionDate, transactionType, currentClientID, currentProductID,stockId ],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log("transaction ajoutée avec succès");
//             console.log(
//               "client :" + currentClientID,
//               "product :" + currentProductID
//             );
//           }
//         }
//       );
//     });

//     res.json({ id: transactionID });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

const upload = multer({ storage });

router.post("/addsell", upload.single("image"), async (req, res) => {
  try {
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
    const CloudinaryimagePath = cloudinaryUpload.secure_url;
    console.log(CloudinaryimagePath);
    const {
      firstName,
      familyName,
      phoneNumber,
      cardNumber,
      Name,
      brand,
      serieNumber1,
      serieNumber2,
      category,
      price,
      productState
    } = req.body;

    const imagePath = `cardsPictures/${req.file.filename}`;
    const query =
      "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath ,cardPathCloud) VALUES (?, ?, ?, ?, ? , ?)";

    const [rows] = await connection.query(query, [
      firstName,
      familyName,
      phoneNumber,
      cardNumber,
      imagePath,
      CloudinaryimagePath
    ]);
    const currentClientID = rows.insertId;
    console.log("Client ajouté avec succès");

    const productQuery =
      "INSERT INTO produitsachetes (Name, brand, serieNumber1, serieNumber2, category, price ,productState) VALUES (?, ?, ?, ?, ?, ? , ?)";

    const [productRows] = await connection.query(productQuery, [
      Name,
      brand,
      serieNumber1,
      serieNumber2,
      category,
      price,
      productState
    ]);
    const currentProductID = productRows.insertId;
    console.log("produit ajouté avec succès" + currentProductID);

    const stockQuery =
      "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ,productState ) VALUES (?, ?, ?, ?, ? , ? , ?, ?)";

    const [stockRows] = await connection.query(stockQuery, [
      Name,
      serieNumber1,
      serieNumber2,
      brand,
      category,
      price,
      price * 1.3,
      productState
    ]);
    const stockId = stockRows.insertId;
    console.log(
      "produit ajouté avec succès dans le stock " + stockId
    );

    const transactionDate = req.body.transactionDate;
    const transactionType = req.body.transactionType;

    console.log(transactionType, transactionDate);
    const transactionQuery =
      "INSERT INTO transactions (transactionDate, transactionType, clientId, produitAcheteId ,stockId  ) VALUES (?, ?, ?, ? ,?)";
if (currentProductID){
    const [transactionRows] = await connection
      .query(transactionQuery, [
        transactionDate,
        transactionType,
        currentClientID,
        currentProductID,
        stockId
      ]);
    
    const transactionID = transactionRows.insertId;
  
    console.log("transaction ajoutée avec succès");
    console.log(
      "client :" + currentClientID,
      "product :" + currentProductID
    );

    res.json({ id: transactionID });
  }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});


// const upload1 = multer({ storage });
// router.post("/addexchange", upload1.single("image"), async (req, res) => {
//   try {
//     const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
//     const CloudinaryimagePath = cloudinaryUpload.secure_url;
//     console.log(CloudinaryimagePath)
//     const { firstName, familyName, phoneNumber, cardNumber } = req.body;
//     const imagePath = `cardsPictures/${req.file.filename}`;
//     const query =
//       "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath ,cardPathCloud) VALUES (?, ?, ?, ?, ? , ?)";

//     const currentClientID = await new Promise((resolve, reject) => {
//      connection.query(
//         query,
//         [firstName, familyName, phoneNumber, cardNumber, imagePath ,CloudinaryimagePath],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log("Client ajouté avec succès");
//           }
//         }
//       );
//     });


//     const Name = req.body.Name;
//     const brand = req.body.brand;
//     const serieNumber1 = req.body.serieNumber1;
//     const serieNumber2 = req.body.serieNumber2;
//     const category = req.body.category;
//     const price = req.body.price;
//     const productState = req.body.productState 
//     console.log(Name, brand, price);
//     const productquiry =
//       "INSERT INTO produitsEchanges (Name, brand, serieNumber1, serieNumber2, category, price ,productState ) VALUES (?, ?, ?, ?, ?, ? , ?)";

//     const currentProductID = await new Promise((resolve, reject) => {
//      connection.query(
//         productquiry,
//         [Name, brand, serieNumber1, serieNumber2, category, price ,productState],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log("produit ajouté avec succès " + this.lastID);
//           }
//         }
//       );
//     });

//     const productName = req.body.productName;
//     const cserieNumber1 = req.body.cserieNumber1;
//     const cserieNumber2 = req.body.cserieNumber2;
//     const cbrand = req.body.cbrand;
//     const ccategory = req.body.ccategory;
//     const buyPrice = req.body.buyPrice;
//     const sellPrice = req.body.sellPrice;

//     const query3 =
//       "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ,productState ) VALUES (?, ?, ?, ?, ? , ? , ? , ?)";
//     const stockId = await new Promise((resolve, reject) => {
//      connection.query(
//         query3,
//         [
//           productName,
//           cserieNumber1,
//           cserieNumber2,
//           cbrand,
//           ccategory,
//           buyPrice,
//           sellPrice,
//           productState
//         ],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log(
//               "produit ajouté avec succès dans le stock " + this.lastID
//             );
//           }
//         }
//       );
//     });

//     const transactionDate = req.body.transactionDate;
//     const transactionType = req.body.transactionType;

//     console.log(transactionType, transactionDate);
//     const query2 =
//       "INSERT INTO transactions (transactionDate, transactionType, clientId, productId ,stockId) VALUES (?, ?, ?, ? , ?)";

//     const transactionID = await new Promise((resolve, reject) => {
//      connection.query(
//         query2,
//         [
//           transactionDate,
//           transactionType,
//           currentClientID,
//           currentProductID,
//           stockId,
//         ],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             reject(err);
//           } else {
//             resolve(this.lastID);
//             console.log("transaction ajoutée avec succès");
//             console.log(
//               "client :" + currentClientID,
//               "product :" + currentProductID
//             );
//           }
//         }
//       );
//     });

//     res.json({ id: transactionID });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

const upload1 = multer({ storage });

router.post("/addexchange", upload1.single("image"), async (req, res) => {
  try {
    // console.log(req.file.path)
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
    const CloudinaryimagePath = cloudinaryUpload.secure_url;
    // console.log(CloudinaryimagePath);

    const { firstName, familyName, phoneNumber, cardNumber } = req.body;
    const imagePath = `cardsPictures/${req.file.filename}`;

    const query1 =
      "INSERT INTO clients (firstName, familyName, phoneNumber, cardNumber, cardPicturepath, cardPathCloud) VALUES (?, ?, ?, ?, ?, ?)";

      const [rows] = await connection.query(query1, [
        firstName,
        familyName,
        phoneNumber,
        cardNumber,
        imagePath,
        CloudinaryimagePath
      ]);

      const currentClientID = rows.insertId;
      console.log("Client ajouté avec succès    " +currentClientID  );

  
      const Name = req.body.Name
      const brand = req.body.brand
      const serieNumber1=req.body.serieNumber1
      const serieNumber2=req.body.serieNumber2
      const category=req.body.category
      const price=req.body.price
      const productState=req.body.productState
  
  

    const productQuery =
      "INSERT INTO produitsEchanges (Name, brand, serieNumber1, serieNumber2, category, price, productState) VALUES (?, ?, ?, ?, ?, ?, ?)";

      const [productRows] = await connection.query(productQuery, [
      Name,
      brand,
      serieNumber1,
      serieNumber2,
      category,
      price,
      productState,
    ]);

    const currentProductID = productRows.insertId;
    console.log("produit echange ajouté avec succès   " + currentProductID);

    const productName = req.body.productName;
    const cserieNumber1 = req.body.cserieNumber1;
    const cserieNumber2 = req.body.cserieNumber2;
    const cbrand = req.body.cbrand;
    const ccategory = req.body.ccategory;
    const buyPrice = req.body.buyPrice;
    const sellPrice = req.body.sellPrice;
    const query3 =
      "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category, buyPrice, sellPrice, productState) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

      const [stockRows] = await connection.query(query3, [
      productName,
      cserieNumber1,
      cserieNumber2,
      cbrand,
      ccategory,
      buyPrice,
      sellPrice,
      productState,
    ]);
    const stockId = stockRows.insertId;
    console.log(
      "produit ajouté avec succès dans le stock " + stockId
    );

    const transactionDate = req.body.transactionDate;
    const transactionType = req.body.transactionType;

    console.log(transactionType, transactionDate);

    const transactionQuery =
      "INSERT INTO transactions (transactionDate, transactionType, clientId, produitEchangeId, stockId) VALUES (?, ?, ?, ?, ?)";

      const [transactionRows] = await connection
      .query(transactionQuery, [
      transactionDate,
      transactionType,
      currentClientID,
      currentProductID,
      stockId

    ]);

    const transactionID = transactionRows.insertId;
    console.log("transaction ajoutée avec succès");
    console.log(
      "client :" + currentClientID,
      "product :" + currentProductID
    );

    res.json({ id: transactionID });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});







router.get("/getAlltransactions", async (req, res) => {
  const query = `
  SELECT t.transactionId, t.transactionDate, t.transactionType,
  c.firstName, c.familyName, c.phoneNumber, c.cardNumber, c.cardPicturePath,c.cardPathCloud,
  pe.ExchangeId, pe.Name AS exchangedProductName, pe.brand AS exchangedProductBrand,
  pe.serieNumber1 AS exchangedProductSerieNumber1, pe.serieNumber2 AS exchangedProductSerieNumber2,
  pe.category AS exchangedProductCategory, pe.price AS exchangedProductPrice,
  pv.sellId, pv.Name AS soldProductName,
  pv.serieNumber1 AS soldProductSerieNumber1, pv.serieNumber2 AS soldProductSerieNumber2,
  pv.category AS soldProductCategory, pv.price AS soldProductPrice,pv.brand AS soldProductBrand,
  s.productId , s.productName AS stockedProductName,
  s.serieNumber1 AS stockedProductSerieNumber1, s.serieNumber2 AS stockedProductSerieNumber2,
  s.category AS stockedProductCategory, s.buyPrice AS stockedProductPrice,s.brand AS stockedProductBrand
FROM transactions AS t
JOIN clients AS c ON t.clientId = c.clientId
LEFT JOIN produitsEchanges AS pe ON t.produitEchangeId = pe.ExchangeId
LEFT JOIN produitsachetes AS pv ON t.produitAcheteId = pv.sellId
LEFT JOIN stock AS s ON t.stockId = s.productId;
  `;
  try {
    const [rows] = await connection.execute(query);

    res.json(rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});




// router.delete("/deleteTransactions/:transactionId", (req, res) => {
//   const transactionId = req.params.transactionId;
//   console.log(transactionId);
//   if (transactionId === -1) {
//     res.status(404).json({ error: "Invalid transactionId" });
//     return;
//   }

//   try {
//    connection.serialize(() => {
//      connection.get(
//         "SELECT transactionType FROM transactions WHERE transactionId = ?",
//         [transactionId],
//         function (err, row) {
//           if (err) {
//             console.error("Database error:", err.message);
//             res.status(500).json({ error: "Database error" });
//             return;
//           }

//           if (!row) {
//             res.status(404).json({ error: "Transaction not found" });
//             return;
//           }

//           if (row.transactionType === "Echange") {
//             deleteProduitsEchanges();
//             deleteProduitsStock();
//           } else if (row.transactionType === "Achat") {
//             deleteproduitsachetes();
//             deleteProduitsStock()
//           } else {
//             deleteClient();
//           }
//         }
//       );

//       function deleteProduitsEchanges() {
//        connection.query(
//           "DELETE FROM produitsEchanges WHERE exchangeId = (SELECT productId FROM transactions WHERE transactionId = ?)",
//           [transactionId],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("ProduitsEchanges deleted");
//               deleteClient();
//             }
//           }
//         );
//       }
      
//       function deleteProduitsStock() {
//        connection.query(
//           "DELETE FROM stock WHERE productId = (SELECT stockId FROM transactions WHERE transactionId = ?)",
//           [transactionId],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Produits  supprimer dans le stock");
              
//             }
//           }
//         );
//       }


//       function deleteproduitsachetes() {
//        connection.query(
//           "DELETE FROM produitsachetes WHERE sellId = (SELECT productId FROM transactions WHERE transactionId = ?)",
//           [transactionId],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("produitsachetes deleted");
//               deleteClient();
//             }
//           }
//         );
//       }

//       function deleteClient() {
//        connection.query(
//           "DELETE FROM clients WHERE clientId = (SELECT clientId FROM transactions WHERE transactionId = ?)",
//           [transactionId],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Client deleted");
//               deleteTransaction();
//             }
//           }
//         );
//       }

//       function deleteTransaction() {
//        connection.query(
//           "DELETE FROM transactions WHERE transactionId = ?",
//           [transactionId],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Transaction deleted");

//               if (this.changes === 0) {
//                 res.status(404).json({ error: "Transaction not found" });
//                 return;
//               }

//               res.status(200).json({
//                 message: "Transaction and associated records deleted successfully",
//               });
//             }
//           }
//         );
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request" });
//   }
// });
router.delete("/deleteTransactions/:transactionId", async (req, res) => {
  const transactionId = req.params.transactionId;
  console.log(transactionId);
  if (transactionId === -1) {
    res.status(404).json({ error: "Invalid transactionId" });
    return;
  }

  try {
    const deleteQuery = `
    DELETE transactions, clients, stock, produitsechanges, produitsachetes
    FROM transactions
    LEFT JOIN clients ON transactions.clientId = clients.clientId
    LEFT JOIN stock ON transactions.stockId = stock.productId
    LEFT JOIN produitsechanges ON transactions.produitEchangeId = produitsechanges.ExchangeId
    LEFT JOIN produitsachetes ON transactions.produitAcheteId = produitsachetes.sellId
    WHERE transactions.transactionId = ? 
  `;
    const [result] = await connection.execute(deleteQuery, [transactionId]);
    if (!result[0])
      res.status(404).json({ error: "transaction was not found" });
    else {
      res.status(200).json({ success: "transaction was deleted" });
    }
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
  const productState = req.body.productState;
  console.log(req.file.filename)
  console.log(req.body)
  const imagePath = `cardsPictures/${req.file.filename}`;
  const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
  const CloudinaryimagePath = cloudinaryUpload.secure_url;
  console.log(CloudinaryimagePath);
  // if (transactionId === -1) {
  //   res.status(400).json({ error: "Invalid transactionId" });
  //   return;
  // }
  const UpdateSell = `
  UPDATE transactions AS t
  JOIN clients AS c ON t.clientId = c.clientId
  LEFT JOIN produitsachetes AS pv ON t.produitAcheteId = pv.sellId
  LEFT JOIN stock AS s ON t.stockId = s.productId
  SET t.transactionDate = ?,
      c.firstName =?,
      c.familyName = ?,
      c.phoneNumber = ?,
      c.cardNumber = ?,
      c.cardPicturePath = ?,
      c.cardPathCloud = ?,
      s.productName = ?,
      s.serieNumber1 = ?,
      s.serieNumber2 = ?,
      s.brand = ? ,
      s.category = ?,
      s.buyPrice = ?,
      s.sellPrice = ?,
      s.productState = ?,
      pv.Name = ?,
      pv.brand = ?,
      pv.serieNumber1 = ?,
      pv.serieNumber2 = ?,
      pv.category = ?,
      pv.price = ?,
      pv.productState = ?
  WHERE t.transactionId = ?;    
`;
const selldata = [
  transactionDate,
  req.body.firstName,
  req.body.familyName,
  req.body.phoneNumber,
  req.body.cardNumber,
  imagePath,
  CloudinaryimagePath,
  req.body.Name,
  req.body.serieNumber1,
  req.body.serieNumber2,
  req.body.brand,
  req.body.category,
  Number(req.body.price),
  Number(req.body.price)*1.3,
  productState,
  req.body.Name,
  req.body.brand,
  req.body.serieNumber1,
  req.body.serieNumber2,
  req.body.category,
  req.body.price,
  productState,
  transactionId,
];
const exchangedata = [
  transactionDate,
  req.body.firstName,
  req.body.familyName,
  req.body.phoneNumber,
  req.body.cardNumber,
  imagePath,
  CloudinaryimagePath,
  req.body.productName,
  req.body.cserieNumber1,
  req.body.cserieNumber2,
  req.body.cbrand,
  req.body.ccategory,
  req.body.buyPrice,
  req.body.sellPrice,
  productState,
  req.body.Name,
  req.body.brand,
  req.body.serieNumber1,
  req.body.serieNumber2,
  req.body.category,
  req.body.price,
  productState,
  transactionId,
];
const UpdateExchange = `
UPDATE transactions AS t
JOIN clients AS c ON t.clientId = c.clientId
LEFT JOIN produitsechanges AS pv ON t.produitEchangeId = pv.exchangeId
LEFT JOIN stock AS s ON t.stockId = s.productId
SET t.transactionDate = ?,
c.firstName =?,
c.familyName = ?,
c.phoneNumber = ?,
c.cardNumber = ?,
c.cardPicturePath = ?,
c.cardPathCloud = ?,
s.productName = ?,
s.serieNumber1 = ?,
s.serieNumber2 = ?,
s.brand = ? ,
s.category = ?,
s.buyPrice = ?,
s.sellPrice = ?,
s.productState = ?,
pv.Name = ?,
pv.brand = ?,
pv.serieNumber1 = ?,
pv.serieNumber2 = ?,
pv.category = ?,
pv.price = ?,
pv.productState = ?
WHERE t.transactionId = ?;    
`;
let UpdateQuery,updateData
transactionType === 'Achat' ? UpdateQuery = UpdateSell :  UpdateQuery = UpdateExchange;
transactionType === 'Achat' ? updateData = selldata :  updateData =exchangedata;

// console.log(updateData)
// console.log(UpdateQuery)
try {
  console.log('ok sou ..........')
  const [result] = await connection.execute(UpdateQuery, updateData );
  if (!result[0])
{    res.status(404).json({ error: "transaction was not found" });
    console.log('ok sou if')}
  else {
    res.status(200).json({ success: "transaction was updated" });
    console.log('ok sou else')
  }
} catch (err) {
  console.log(err);
  res
    .status(500)
    .json({ error: "An error occurred while processing the request" });
    console.log('catch bloc executed')
}
});






// const upload2 = multer({ storage });
// router.patch("/updateTransaction/:transactionId",upload2.single("image"),async (req, res) => {
  // const transactionId = req.params.transactionId;
  // const transactionType = req.body.transactionType;
  // const transactionDate = req.body.transactionDate;
  // const productState =req.body.productState
  // const imagePath = `cardsPictures/${req.file.filename}`;



//   console.log(transactionId);
//   if (transactionId === -1) {
//     res.status(400).json({ error: "Invalid transactionId" });
//     return;
//   }

//   try {
//     const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
//     const CloudinaryimagePath = cloudinaryUpload.secure_url;
//     console.log(CloudinaryimagePath)
  
//    connection.serialize(() => {

//      connection.query(
//         "UPDATE transactions SET transactionDate = ? WHERE transactionId = ?",
//         [transactionDate, transactionId],
//         function (err) {
//           if (err) {
//             console.error("Database error:", err.message);
//             res.status(500).json({ error: "Database error" });
//             return;
//           } else {
//             console.log("Transaction");
//             updateClient();
//             if (transactionType === "Echange") {
//               updateProduitsEchanges();
//               updateStock();
//             } else {
//               updateproduitsachetes();
//               updateStock2();
//             }
//             res.status(200).json({
//               message:
//                 "Transaction and associated records updated successfully",
//             });
//           }
//         }
//       );
      
    
// console.log(CloudinaryimagePath)
      

//       function updateStock() {
//        connection.query(
//           "UPDATE stock SET productName = ?, serieNumber1 = ?, serieNumber2 = ?, brand = ?, category = ?, buyPrice = ?, sellPrice = ? ,productState = ? WHERE productId = (SELECT stockId FROM transactions WHERE transactionId = ?)",
//           [
            // req.body.productName,
            // req.body.cserieNumber1,
            // req.body.cserieNumber2,
            // req.body.cbrand,
            // req.body.ccategory,
            // req.body.buyPrice,
            // req.body.sellPrice,
            // productState,
//             transactionId,
//           ],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Produits  modifier dans le stock");
              
//             }
//           }
//         );
//       }

//       function updateStock2() {
//        connection.query(
//           "UPDATE stock SET productName = ?, serieNumber1 = ?, serieNumber2 = ?, brand = ?, category = ?, buyPrice = ?, sellPrice = ? ,productState = ? WHERE productId = (SELECT stockId FROM transactions WHERE transactionId = ?)",
//           [
            // req.body.Name,
            // req.body.serieNumber1,
            // req.body.serieNumber2,
            // req.body.brand,
            // req.body.category,
            // req.body.price,
            // req.body.price*1.3,
            // productState,
//             transactionId,
//           ],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Produits  modifier dans le stock");
              
//             }
//           }
//         );
//       }

//       function updateproduitsachetes() {
//        connection.query(
//           "UPDATE produitsachetes SET Name = ?, brand = ?, serieNumber1 = ?, serieNumber2 = ?, category = ?, price = ? ,productState = ?  WHERE sellId = (SELECT productId FROM transactions WHERE transactionId = ?)",
//           [
            // req.body.Name,
            // req.body.brand,
            // req.body.serieNumber1,
            // req.body.serieNumber2,
            // req.body.category,
            // req.body.price,
            // productState,
//             transactionId,
//           ],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("produits achetes updated");
              
//             }
//           }
//         );
//       }
      
//       function updateProduitsEchanges() {
//        connection.query(
//           "UPDATE produitsEchanges SET Name = ?, brand = ?, serieNumber1 = ?, serieNumber2 = ?, category = ?, price = ?, productState = ? WHERE exchangeId = (SELECT productId FROM transactions WHERE transactionId = ?)",
//           [
//             req.body.Name,
//             req.body.brand,
//             req.body.serieNumber1,
//             req.body.serieNumber2,
//             req.body.category,
//             req.body.price,
//             productState,
//             transactionId,
//           ],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Produits Echanges modified");
//               console.log( 
//                 req.body.Name,+"  "+ 
//                 req.body.brand +"  "+ 
//                 req.body.serieNumber1+"  "+ 
//                 req.body.serieNumber2+"  "+ 
//                 req.body.category+"  "+ 
//                 req.body.price+"  "+ 
//                 productState+"  "+ 
//                 transactionId+"  ")
//             }
//           }
//         );
//       }


//       function updateClient() {
//        connection.query(
//             "UPDATE clients SET firstName = ?, familyName = ?, phoneNumber = ?, cardNumber = ?, cardPicturePath = ? , cardPathCloud =?  WHERE clientId = (SELECT clientId FROM transactions WHERE transactionId = ?)",
//             [
//               req.body.firstName,
//               req.body.familyName,
//               req.body.phoneNumber,
//               req.body.cardNumber,
//               imagePath,
//               CloudinaryimagePath,
//               transactionId,
//             ],
//           function (err) {
//             if (err) {
//               console.error("Database error:", err.message);
//               res.status(500).json({ error: "Database error" });
//               return;
//             } else {
//               console.log("Client updated");
//             }
//           }
//         );
//       }


//     });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request" });
//   }
// });
 
module.exports = router;
