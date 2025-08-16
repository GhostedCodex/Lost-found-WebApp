const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { index_number, full_name, email, password } = req.body;

  // Form validation (very basic)
  if (!index_number || !full_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user
    const sql = 'INSERT INTO users (index_number, full_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [index_number, full_name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', (req, res) => {
  const { index_number, password } = req.body;

  if (!index_number || !password) {
    return res.status(400).json({ message: 'Index number and Password required.' });
  }

  const sql = 'SELECT * FROM users WHERE index_number = ?';
  db.query(sql, [index_number], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Password correct, login success
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          index_number: user.index_number,
          full_name: user.full_name,
          email: user.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error comparing passwords' });
    }
  });
});


module.exports = router;
