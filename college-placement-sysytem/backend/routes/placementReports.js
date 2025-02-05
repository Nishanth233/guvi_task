const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Interview = require("../models/Interview");
const PlacementDrive = require("../models/PlacementDrive");

// Get placement reports
router.get("/", async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const totalPlacementDrives = await PlacementDrive.countDocuments();

    res.send({
      totalApplications,
      totalInterviews,
      totalPlacementDrives,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching placement reports", error });
  }
});

module.exports = router;
