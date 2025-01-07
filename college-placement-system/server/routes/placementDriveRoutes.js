const express = require("express");
const router = express.Router();
const {
  createPlacementDrive,
  getAllPlacementDrives,
} = require("../controllers/placementDriveController");

router.post("/create", createPlacementDrive);
router.get("/", getAllPlacementDrives);

module.exports = router;
