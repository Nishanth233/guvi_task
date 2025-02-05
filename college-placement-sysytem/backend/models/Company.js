const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: false },
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
