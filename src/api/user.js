const router = require("express").Router();
const db = require('../database/db')

router.post("/signup", (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword ) 
  {
    console.log("passwords do not match");
  
  }
  else {
    try {
      const query = "INSERT INTO users (username, password) VALUES (?, ?)";

      db.run(query, [username, password], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json({ id: this.lastID });
          console.log('welcome' + username)
        }
      });
    } catch (err) {
      console.log(err)
    }
  }
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  try {
    // Implement code to validate the user's credentials
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Database error" });
      } else if (!row) {
        // No user found with the provided username
        res.status(401).json({ error: "Invalid credentials" });
      } else if (row.password !== password) {
        // Password mismatch
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        // User is successfully signed in
        res.json({ message: "Sign-in successful" });
        console.log("Welcome, " + username);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
