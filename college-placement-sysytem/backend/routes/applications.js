const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const AcademicRecord = require("../models/AcademicRecord");
const Student = require("../models/Student");

// Create a new application
router.post("/", async (req, res) => {
  const { name, email, resume, coverLetter, grade, achievements } = req.body;
  try {
    // Create a new student or find the existing student
    let student = await Student.findOne({ email });
    if (!student) {
      student = new Student({ name, email, resume });
      await student.save();
    }

    // Create a new application
    const application = new Application({
      student: student._id,
      resume,
      coverLetter,
    });
    await application.save();

    // Create a new academic record
    const academicRecord = new AcademicRecord({
      student: student._id,
      grade,
      achievements,
    });
    await academicRecord.save();

    // Update student's references
    student.applications.push(application._id);
    student.academicRecords.push(academicRecord._id);
    await student.save();

    res.status(201).send({ application, academicRecord });
  } catch (error) {
    res.status(500).send({ message: "Failed to submit application", error });
  }
});

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate({
      path: "student",
      populate: {
        path: "academicRecords",
      },
    });
    res.send(applications);
  } catch (error) {
    res.status(500).send({ message: "Error fetching applications", error });
  }
});
module.exports = router;
