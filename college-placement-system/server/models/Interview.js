const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  company: String,
  position: String,
  date: Date,
  status: { type: String, default: "scheduled" },
  format: { type: String, enum: ["in-person", "virtual"], default: "virtual" },
});

module.exports = mongoose.model("Interview", InterviewSchema);
