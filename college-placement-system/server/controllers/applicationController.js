const Application = require("../models/Application");

exports.createApplication = async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("student");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
