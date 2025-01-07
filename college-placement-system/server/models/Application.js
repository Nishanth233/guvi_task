const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  company: String,
  position: String,
  status: { type: String, default: "submitted" },
});

module.exports = mongoose.model("Application", ApplicationSchema);
