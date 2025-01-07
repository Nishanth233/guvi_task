const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const metrics = {
    studentsPlaced: 100,
    offersAccepted: 95,
    successRate: 95,
  };
  res.json(metrics);
});

module.exports = router;
