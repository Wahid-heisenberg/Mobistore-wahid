const router = require("express").Router();
const db = require('../database/db')

router.post("/addworker", (req, res) => {
    try {
      const { firstName, familyName, email, phoneNumber, workHoures } = req.body;
  
      const query = "INSERT INTO workers (firstName, familyName, email, phoneNumber, workHoures) VALUES (?, ?, ?, ?, ?)";
  
      db.run(query, [firstName, familyName, email, phoneNumber, workHoures], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json({ id: this.lastID });
          console.log('Worker added successfully');
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  

  router.get("/showWorkers", (req, res) => {
    try {
      const query = "SELECT * FROM workers";
  
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

  router.delete("/deleteworker/:workerId", (req, res) => {
    const workerId = req.params.workerId
    try {
      const query = "DELETE FROM workers WHERE workerId = ?";
  
      db.run(query,[workerId], (err, rows) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          console.log('travailleur supprimer avec success')
          res.json(rows);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.patch("/update/:workerId", (req, res) => {
    const workerId = req.params.workerId
    const { firstName, familyName, email, phoneNumber, workHoures } = req.body;
    try {
      const query = "SET workers WHERE workerId = (SELECT FROM workers WHERE workerId = ?) ";
  
      db.run(query,[firstName, familyName, email, phoneNumber, workHoures], (err, rows) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          console.log('travailleur supprimer avec success')
          res.json(rows);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  

module.exports = router;
