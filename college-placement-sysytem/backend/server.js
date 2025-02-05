const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://Nishanth:shan123@cluster0.2jfna.mongodb.net/project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the College Placement Management System API");
});

// Routes
const studentsRoutes = require("./routes/students");
const applicationsRoutes = require("./routes/applications");
const interviewsRoutes = require("./routes/interviews");
const companiesRoutes = require("./routes/companies");
const jobListingsRoutes = require("./routes/jobListings");
const placementDrivesRoutes = require("./routes/placementDrives");
const academicRecordsRoutes = require("./routes/academicRecords");
const importCompanyDataRoutes = require("./routes/importCompanyData");
const exportCompanyDataRoutes = require("./routes/exportCompanyData");
const authRoutes = require("./routes/auth");
const recruitmentStatusRoutes = require("./routes/recruitmentStatus");
const placementReportsRoutes = require("./routes/placementReports");
app.use("/api/recruitmentStatus", recruitmentStatusRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/jobListings", jobListingsRoutes);
app.use("/api/placementDrives", placementDrivesRoutes);
app.use("/api/academicRecords", academicRecordsRoutes);
app.use("/api/importCompanyData", importCompanyDataRoutes);
app.use("/api/exportCompanyData", exportCompanyDataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/placementReports", placementReportsRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
