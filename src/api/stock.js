const router = require("express").Router();
const { connection } = require('../database/db.js');

router.post("/addproduct", async (req, res) => {
  try {
    const { productName, serieNumber1, serieNumber2, brand, category, buyPrice, sellPrice, productState } = req.body;

    const query = "INSERT INTO stock (productName, serieNumber1, serieNumber2, brand, category, buyPrice, sellPrice, productState) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    await connection.execute(query, [productName, serieNumber1, serieNumber2, brand, category, buyPrice, sellPrice, productState]);

    res.status(200).json({ message: "Product added successfully" });
    console.log('produit ajouté avec succès');
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/afficherStock", async (req, res) => {
  try {
    const query = "SELECT * FROM stock";
    const [rows] = await connection.execute(query);
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/work", (req, res) => {
  try {
    const num = req.body.num;
    console.log(num)
    res.status(200).json({ message: "services is working" });
  } catch (err) {
    console.error("service problems:", err.message);
    res.status(500).json({ error: "service problems" });
  }
});

  

module.exports = router;
