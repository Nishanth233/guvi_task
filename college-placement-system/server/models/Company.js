const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  jobListings: [
    {
      position: String,
      description: String,
      requirements: String,
      status: { type: String, default: "open" },
    },
  ],
});

module.exports = mongoose.model("Company", CompanySchema);
