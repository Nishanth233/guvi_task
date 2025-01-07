const express = require("express");
const router = express.Router();
const {
  scheduleInterview,
  getAllInterviews,
} = require("../controllers/interviewController");

router.post("/schedule", scheduleInterview);
router.get("/", getAllInterviews);

module.exports = router;
