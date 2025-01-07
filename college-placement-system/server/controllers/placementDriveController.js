const PlacementDrive = require("../models/PlacementDrive");

exports.createPlacementDrive = async (req, res) => {
  try {
    const newPlacementDrive = new PlacementDrive(req.body);
    await newPlacementDrive.save();
    res.status(201).json(newPlacementDrive);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllPlacementDrives = async (req, res) => {
  try {
    const placementDrives = await PlacementDrive.find().populate("companies");
    res.status(200).json(placementDrives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
