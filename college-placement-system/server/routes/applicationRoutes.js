const express = require("express");
const router = express.Router();
const {
  createApplication,
  getAllApplications,
} = require("../controllers/applicationController");

router.post("/apply", createApplication);
router.get("/", getAllApplications);

module.exports = router;
