const express = require("express");
const router = express.Router();
const JobListing = require("../models/JobListing");
const Company = require("../models/Company");

// Create a new job listing
router.post("/", async (req, res) => {
  const { company, title, description } = req.body;
  try {
    // Ensure the company exists
    const companyDoc = await Company.findById(company);
    if (!companyDoc) {
      return res.status(404).send({ message: "Company not found" });
    }

    // Create a new job listing
    const jobListing = new JobListing({ company, title, description });
    await jobListing.save();

    res.status(201).send({ jobListing });
  } catch (error) {
    res.status(500).send({ message: "Error creating job listing", error });
  }
});

// Get all job listings with populated company field
router.get("/", async (req, res) => {
  try {
    const jobListings = await JobListing.find().populate("company");
    res.send(jobListings);
  } catch (error) {
    res.status(500).send({ message: "Error fetching job listings", error });
  }
});

module.exports = router;
