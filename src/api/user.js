const router = require("express").Router();
const db = require('../database/db')
const bcrypt = require('bcryptjs');



// router.post("/signup", (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   if (password !== confirmPassword ) 
//   {
//     console.log("passwords do not match");
  
//   }
//   else {
//     try {
//       const query = "INSERT INTO users (username, password) VALUES (?, ?)";

//       db.run(query, [username, password], function (err) {
//         if (err) {
//           console.error("Database error:", err.message);
//           res.status(500).json({ error: "Database error" });
//         } else {
//           res.json({ id: this.lastID });
//           console.log('welcome' + username)
//         }
//       });
//     } catch (err) {
//       console.log(err)
//     }
//   }
// });

// router.post("/signin", (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Implement code to validate the user's credentials
//     db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
//       if (err) {
//         console.error("Database error:", err.message);
//         res.status(500).json({ error: "Database error" });
//       } else if (!row) {
//         // No user found with the provided username
//         res.status(401).json({ error: "Invalid credentials" });
//       } else if (row.password !== password) {
//         // Password mismatch
//         res.status(401).json({ error: "Invalid credentials" });
//       } else {
//         // User is successfully signed in
//         res.json({ message: "Sign-in successful" });
//         console.log("Welcome, " + username);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post('/signup', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    res.status(400).json({ error: 'Passwords do not match' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 15);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    await db.run(query, [username, hashedPassword]);
    //jwt
    res.json({ message: 'Sign-up successful'});

    console.log('Welcome ' + username);
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Error signing up' });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      // Check if username or password is missing
      res.status(400).json({ error: "Username or password is missing" });
      return;
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Database error" });
      } else if (!row) {
        // No user found with the provided username
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(password, row.password);

        if (!passwordMatch) {
          // Password mismatch
          res.status(401).json({ error: "Invalid credentials" });
        } else {
          // User is successfully signed in
          res.json({ message: "Sign-in successful" });
          console.log("Welcome, " + username);
        }
      }
    });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});



module.exports = router;
