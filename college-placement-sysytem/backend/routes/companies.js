const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Create a new company
router.post("/register", async (req, res) => {
  const { name, industry, location, website } = req.body;
  try {
    const company = new Company({ name, industry, location, website });
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    res.status(500).send({ message: "Failed to register company", error });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.send(companies);
});

module.exports = router;
