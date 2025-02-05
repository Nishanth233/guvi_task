const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Export company data
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (error) {
    res.status(500).send({ message: "Error exporting company data", error });
  }
});

module.exports = router;
