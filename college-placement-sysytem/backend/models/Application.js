const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  company: String,
  status: { type: String, default: "submitted" },
  resume: String,
  coverLetter: String,
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
