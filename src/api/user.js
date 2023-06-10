const router = require("express").Router();
const {connection} = require('../database/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret key
const JWT_SECRET = '9Y#j2@pK7*uQ5&gW1$z3';

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
  
    await connection.execute(query, [username, hashedPassword]);
  
    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ message: 'Sign-up successful', token });
  
    console.log('Welcome ' + username + ' ' + token);
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Error signing up' });
  }
  
});

// router.post("/signin", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     if (!username || !password) {
//       // Check if username or password is missing
//       res.status(400).json({ error: "Username or password is missing" });
//       return;
//     }

//     connection.query("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
//       if (err) {
//         console.error("Database error:", err.message);
//         res.status(500).json({ error: "Database error" });
//       } else if (!row) {
//         // No user found with the provided username
//         res.status(401).json({ error: "Invalid credentials" });
//       } else {
//         // Compare the hashed password
//         const passwordMatch = await bcrypt.compare(password, row.password);

//         if (!passwordMatch) {
//           // Password mismatch
//           res.status(401).json({ error: "Invalid credentials" });
//         } else {
//           // Generate a JWT token
//           const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
//           console.log(token)

//           // User is successfully signed in
//           res.json({ message: "Sign-in successful", token });
//           console.log("Welcome, " + username +'  '+ token);
//         }
//       }
//     });
//   } catch (err) {
//     console.error("Database error:", err.message);
//     res.status(500).json({ error: "Database error" });
//   }
// });
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      // Check if username or password is missing
      res.status(400).json({ error: "Username or password is missing" });
      return;
    }

    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await connection.query(query, [username]);

    if (rows.length === 0) {
      // No user found with the provided username
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user = rows[0];

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password mismatch
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    // User is successfully signed in
    res.json({ message: "Sign-in successful", token });
    console.log("Welcome, " + username + ' ' + token);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
