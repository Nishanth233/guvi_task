const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");

// Create a new interview
router.post('/', async (req, res) => {
  const { student, company, date } = req.body;
  if (!student) {
    return res.status(400).send({ message: 'Student is required' });
  }
  try {
    const interview = new Interview({ student, company, date });
    await interview.save();
    res.send(interview);
  } catch (error) {
    res.status(500).send({ message: 'Failed to create interview', error });
  }
});

// Get all interviews
router.get("/", async (req, res) => {
  const interviews = await Interview.find().populate("student");
  res.send(interviews);
});

module.exports = router;
