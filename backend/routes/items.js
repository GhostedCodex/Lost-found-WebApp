const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all items
router.get('/', (req, res) => {
    db.query("SELECT * FROM items ORDER BY reported_date DESC", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const {title, description, location, status, user_id } = req.body;
    const sql = `
        INSERT INTO items (title, description, location, status, reported_date, user_id)
        VALUES (?, ?, ?, ?, CURDATE(), ?)
    `;
    db.query(sql, [title, description, location, status, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Item reported successfully'});
    });
});

module.exports = router;