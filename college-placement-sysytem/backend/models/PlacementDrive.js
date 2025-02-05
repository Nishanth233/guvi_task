const mongoose = require("mongoose");

const placementDriveSchema = new mongoose.Schema({
  eventName: String,
  date: Date,
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
});

const PlacementDrive = mongoose.model("PlacementDrive", placementDriveSchema);

module.exports = PlacementDrive;
