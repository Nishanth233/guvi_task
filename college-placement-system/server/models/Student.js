const mongoose = require("mongoose");

const AcademicRecordSchema = new mongoose.Schema({
  subject: String,
  grade: String,
  achievements: [String],
  transcript: String,
});

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  academicRecords: [AcademicRecordSchema],
  // Other student fields
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
