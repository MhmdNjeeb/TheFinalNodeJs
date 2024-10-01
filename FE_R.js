const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("points", { pageTitle: "points" });
});

router.get("/visits", (req, res) => {
    res.render("visits", { pageTitle: "visits" });
});