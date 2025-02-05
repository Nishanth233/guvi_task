const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, required: false },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  academicRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AcademicRecord" },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
