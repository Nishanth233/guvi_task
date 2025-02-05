const express = require("express");
const router = express.Router();
const PlacementDrive = require("../models/PlacementDrive");

// Create a new placement drive
router.post("/", async (req, res) => {
  const placementDrive = new PlacementDrive(req.body);
  await placementDrive.save();
  res.send(placementDrive);
});

// Get all placement drives
router.get("/", async (req, res) => {
  const placementDrives = await PlacementDrive.find().populate("companies");
  res.send(placementDrives);
});

module.exports = router;
