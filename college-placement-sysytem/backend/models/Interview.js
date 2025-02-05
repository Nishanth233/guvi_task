const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  company: String,
  date: Date,
  status: { type: String, default: "scheduled" },
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
