const express = require('express');
const router = express.Router();


router.post("/add", (req, res) => {
    const { name, location } = req.body;
    const q = `INSERT INTO points (name, location) VALUES (?, ?)`;

    db_pool.query(q, [name, location], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Point added successfully", id: result.insertId });
        }
    });
});

router.patch("/edit/:id", (req, res) => {
    const id = req.params.id;
    const { name, location } = req.body;
    const updates = [];
    const values = [];

    if (name) {
        updates.push("name = ?");
        values.push(name);
    }
    if (location) {
        updates.push("location = ?");
        values.push(location);
    }

    if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const q = `UPDATE points SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);

    db_pool.query(q, values, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Point updated successfully" });
        }
    });
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const q = `DELETE FROM points WHERE id = ?`;

    db_pool.query(q, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Point deleted successfully" });
        }
    });
});

router.get("/list", (req, res) => {
    const q = "SELECT * FROM points";

    db_pool.query(q, (err, rows) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

module.exports = router;
