const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // MySQL connection
const router = express.Router();

// Signup route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  if (password.length < 6) {
    return res.status(400).send('Password must be at least 6 characters');
  }

  // Check if the username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Error checking username availability');

    if (results.length > 0) {
      return res.status(400).send('Username is already taken');
    }

    // Hash password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Error hashing password');
      
      // Insert new user into the database
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error registering user:', err); // Log the error
          return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered successfully');
      });
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Check if the user exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Error querying database');
    
    if (results.length === 0) {
      return res.status(400).send('User not found');
    }

    // Compare the password with the hashed password stored in the database
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');

      if (isMatch) {
        // Create JWT token with the user's ID
        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add expiry time to the token
        res.status(200).json({ token });
      } else {
        res.status(400).send('Invalid credentials');
      }
    });
  });
});

module.exports = router;
