const router = require("express").Router();
const db = require('../database/db')

router.post("/addproduct", (req, res) => {
    try {
      const { productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice } = req.body;
  
      const query = "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice ) VALUES (?, ?, ?, ?, ? , ? , ?)";
  
      db.run(query, [productName, serieNumber1, serieNumber2, brand, category ,buyPrice,sellPrice], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json({ id: this.lastID });
          console.log('produit ajouter avec success');
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  

  router.get("/afficherStock", (req, res) => {
    try {
      const query = "SELECT * FROM stock";
  
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
