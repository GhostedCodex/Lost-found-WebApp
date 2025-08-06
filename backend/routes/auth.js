const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

const saltRounds = 10;

// Register a new user
router.post("/register", async (req, res) => {
  const { index_number, name, email, password } = req.body;

  if (!index_number || !name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql =
      "INSERT INTO users (index_number, name, email, password) VALUES (?, ?, ?, ?)";
    const result = db.query(
      sql,
      [index_number, name, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(409)
              .json({ error: "Index number or email already exists" });
          }
          return res.status(500).json({ error: err });
        }
        return res
          .status(201)
          .json({
            message: "User registered successfully",
            user: { id: result.insertId, index_number, name, email },
          });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Login
router.post("/login", (req, res) => {
  const { index_number, password } = req.body;

  if (!index_number || !password) {
    return res
      .status(400)
      .json({ error: "Both index number and password are required" });
  }

  const sql = "SELECT * FROM users WHERE index_number = ?";
  db.query(sql, [index_number], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, index_number: user.index_number },
    });
  });
});

module.exports = router;
