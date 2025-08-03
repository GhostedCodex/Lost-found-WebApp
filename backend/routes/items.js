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

module.exports = router;