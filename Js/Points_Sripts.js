const express = require('express');
const router = express.Router();
module.exports = router;

router.post("/add", (req, res) => {
    const { name, location } = req.body;

    const q = `INSERT INTO points (name, location) VALUES ('${name}', '${location}')`;

    db_pool.query(q, (err, result) => {
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

    const q = `UPDATE points SET name = '${name}', location = '${location}' WHERE id = ${id}`;

    db_pool.query(q, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Point updated successfully" });
        }
    });
});


router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    const q = `DELETE FROM points WHERE id = ${id}`;

    db_pool.query(q, (err, result) => {
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
