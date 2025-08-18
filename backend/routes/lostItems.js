const express = require("express");
const router = express.Router();
const db = require("../db"); // your MySQL connection file

// Report lost item
router.post("/report", (req, res) => {
  const { item_name, description, lost_location, lost_date, reporter_name, reporter_index, reporter_contact } = req.body;

  const sql = `
    INSERT INTO lost_items (item_name, description, lost_location, lost_date, reporter_name, reporter_index, reporter_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [item_name, description, lost_location, lost_date, reporter_name, reporter_index, reporter_contact], (err, result) => {
    if (err) {
      console.error("Error inserting lost item:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, message: "Lost item reported successfully!" });
  });
});

// View lost items
router.get("/list", (req, res) => {
  const sql = "SELECT * FROM lost_items ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching lost items:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;