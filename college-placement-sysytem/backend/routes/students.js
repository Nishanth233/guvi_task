const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Create a new student
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

router.get("/", async (req, res) => {
  const students = await Student.find({
    applications: { $exists: true, $not: { $size: 0 } },
  }).populate("applications");
  res.send(students);
});

module.exports = router;
