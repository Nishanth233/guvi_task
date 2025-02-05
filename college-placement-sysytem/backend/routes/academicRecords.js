const express = require("express");
const router = express.Router();
const AcademicRecord = require("../models/AcademicRecord");
const Student = require("../models/Student");

// Create a new academic record
router.post("/", async (req, res) => {
  const { student, grade, achievements } = req.body;
  try {
    const academicRecord = new AcademicRecord({ student, grade, achievements });
    await academicRecord.save();
    res.status(201).send(academicRecord);
  } catch (error) {
    res.status(500).send({ message: "Error creating academic record", error });
  }
});

// Get all academic records
router.get("/", async (req, res) => {
  try {
    const academicRecords = await AcademicRecord.find().populate("student");
    res.send(academicRecords);
  } catch (error) {
    res.status(500).send({ message: "Error fetching academic records", error });
  }
});

module.exports = router;
