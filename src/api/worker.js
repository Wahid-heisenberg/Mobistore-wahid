const router = require("express").Router();
const {connection} = require('../database/db.js');

router.post("/addworker", (req, res) => {
    try {
      const { firstName, familyName, email, phoneNumber, workHoures } = req.body;
  
      const query = "INSERT INTO workers (firstName, familyName, email, phoneNumber, workHoures) VALUES (?, ?, ?, ?, ?)";
  
       connection.query(query, [firstName, familyName, email, phoneNumber, workHoures], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          res.status(200).json({ id: this.lastID });
          console.log('Worker added successfully');
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  

  router.get("/showWorkers", async (req, res) => {
    try {
      const query = "SELECT * FROM workers";
      const [rows] = await connection.execute(query);
  
      res.json(rows);
    } catch (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Database error" });
    }
  });
  
  
  

  // router.delete("/deleteworker/:workerId", (req, res) => {
  //   const workerId = req.params.workerId
  //   try {
  //     const query = "DELETE FROM workers WHERE workerId = ?";
  
  //     db.run(query,[workerId], (err, rows) => {
  //       if (err) {
  //         console.error("Database error:", err.message);
  //         res.status(500).json({ error: "Database error" });
  //       } else {
  //         console.log('travailleur supprimer avec success')
  //         res.json(rows);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // router.patch("/update/:workerId", (req, res) => {
  //   const workerId = req.params.workerId
  //   const { firstName, familyName, email, phoneNumber, workHoures } = req.body;
  //   try {
  //     const query = "SET workers WHERE workerId = (SELECT FROM workers WHERE workerId = ?) ";
  
  //     db.run(query,[firstName, familyName, email, phoneNumber, workHoures], (err, rows) => {
  //       if (err) {
  //         console.error("Database error:", err.message);
  //         res.status(500).json({ error: "Database error" });
  //       } else {
  //         console.log('travailleur supprimer avec success')
  //         res.json(rows);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
  

module.exports = router;
