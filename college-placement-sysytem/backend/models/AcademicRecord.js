const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  grade: { type: String, required: true },
  achievements: { type: String, required: true },
});

const AcademicRecord = mongoose.model("AcademicRecord", academicRecordSchema);

module.exports = AcademicRecord;
