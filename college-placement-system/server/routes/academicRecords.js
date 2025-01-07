const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/students/:id/academic-records", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Simulate fetching academic records from another database or service
    const academicRecords = {
      grades: [
        { subject: "Mathematics", grade: "A" },
        { subject: "Computer Science", grade: "A+" },
      ],
      achievements: ["First Place in Coding Competition", "Dean's List"],
    };
    console.log(academicRecords); // Log the data being sent
    res.status(200).json(academicRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
