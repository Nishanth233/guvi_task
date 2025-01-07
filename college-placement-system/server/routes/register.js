const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/register", async (req, res) => {
  const { name, email, resume } = req.body;
  try {
    const newStudent = new Student({ name, email, resume });
    await newStudent.save();
    res.json({ studentId: newStudent._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
