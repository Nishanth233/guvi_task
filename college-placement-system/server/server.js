const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
require("dotenv").config(); // Ensure this line is at the top
// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the College Placement Management System");
});

const studentRoutes = require("./routes/studentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const companyRoutes = require("./routes/companyRoutes");
const placementDriveRoutes = require("./routes/placementDriveRoutes");
const academicRecordsRoutes = require("./routes/academicRecords");
const metricsRoutes = require("./routes/metrics"); // Include the metrics route
const registerRoutes = require("./routes/register");

app.use("/students", studentRoutes);
app.use("/applications", applicationRoutes);
app.use("/interviews", interviewRoutes);
app.use("/companies", companyRoutes);
app.use("/placement-drives", placementDriveRoutes);
app.use("/academic-records", academicRecordsRoutes);
app.use("/metrics", metricsRoutes); // Use the metrics route
app.use("/students/register", registerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
