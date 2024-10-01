const express = require('express');
const router = express.Router();


router.post("/add", (req, res) => {
    const { pointId, guardName, notes } = req.body;
    const visitTime = new Date();
    const q = `INSERT INTO visits (point_id, guard_name, notes, visit_time) VALUES (?, ?, ?, ?)`;

    db_pool.query(q, [pointId, guardName, notes, visitTime], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Visit added successfully", id: result.insertId });
        }
    });
});

router.patch("/edit/:id", (req, res) => {
    const id = req.params.id;
    const { pointId, guardName, notes } = req.body;
    const updates = [];
    const values = [];

    if (pointId) {
        updates.push("point_id = ?");
        values.push(pointId);
    }
    if (guardName) {
        updates.push("guard_name = ?");
        values.push(guardName);
    }
    if (notes) {
        updates.push("notes = ?");
        values.push(notes);
    }

    if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const q = `UPDATE visits SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);

    db_pool.query(q, values, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Visit updated successfully" });
        }
    });
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const q = `DELETE FROM visits WHERE id = ?`;

    db_pool.query(q, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "Visit deleted successfully" });
        }
    });
});

router.get("/list", (req, res) => {
    const q = `SELECT visits.id, visits.guard_name, visits.notes, visits.visit_time, points.name AS point_name
               FROM visits
               JOIN points ON visits.point_id = points.id`;

    db_pool.query(q, (err, rows) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

module.exports = router;
