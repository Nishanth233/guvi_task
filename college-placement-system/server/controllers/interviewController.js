const Interview = require("../models/Interview");

exports.scheduleInterview = async (req, res) => {
  try {
    const newInterview = new Interview(req.body);
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("student");
    res.status(200).json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
