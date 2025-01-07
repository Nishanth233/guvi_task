const mongoose = require("mongoose");

const PlacementDriveSchema = new mongoose.Schema({
  name: String,
  date: Date,
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  status: { type: String, default: "upcoming" },
});

module.exports = mongoose.model("PlacementDrive", PlacementDriveSchema);
