const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Configure multer (store files in uploads/ folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

//  Report new item (with file upload)
router.post("/report", upload.single("item_image"), (req, res) => {
  const { item_name, description, location_found, date_found, reporter_name, reporter_index } = req.body;
  const item_image = req.file ? req.file.filename : null;

  if (!item_name || !reporter_name || !reporter_index) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  db.query(
    "INSERT INTO found_items (item_name, description, location_found, date_found, reporter_name, reporter_index, item_image) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [item_name, description, location_found, date_found, reporter_name, reporter_index, item_image],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      res.json({ success: true, message: "Item reported successfully" });
    }
  );
});

//  Claim an item

router.post("/claim/:id", (req, res) => {
  const itemId = req.params.id;
  const { claimant_name, index_number, phone_contact, email, level, course_of_study } = req.body;

  if (!claimant_name || !index_number || !phone_contact || !email) {
    return res.status(400).json({ success: false, message: "All required fields must be filled" });
  }

  // Insert claimant info
  db.query(
    "INSERT INTO claimed_items (item_id, claimant_name, index_number, phone_contact, email, level, course_of_study) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [itemId, claimant_name, index_number, phone_contact, email, level, course_of_study],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      // Mark item as claimed
      db.query("UPDATE found_items SET claimed = true WHERE id = ?", [itemId], (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ success: false, message: "Server error" });
        }

        res.json({ success: true, message: "Item claimed successfully. You will be contacted soon." });
      });
    }
  );
});

//  Fetch all reported items
router.get("/", (req, res) => {
  db.query("SELECT * FROM found_items ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json({ success: true, items: rows });
  });
});

//  Fetch claimed items
router.get("/claimed", (req, res) => {
  db.query(
    "SELECT found_items.item_name, items.description, c.* FROM claimed_items c JOIN items ON c.item_id = items.id ORDER BY c.created_at DESC",
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      res.json({ success: true, claimed_items: rows });
    }
  );
});

module.exports = router;

