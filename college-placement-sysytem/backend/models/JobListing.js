const mongoose = require("mongoose");

const jobListingSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  title: String,
  description: String,
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
});

const JobListing = mongoose.model("JobListing", jobListingSchema);

module.exports = JobListing;
