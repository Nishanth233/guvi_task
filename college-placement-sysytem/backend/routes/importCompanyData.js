const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Company = require("../models/Company");

// Configure multer for file upload
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
  const file = req.file;
  const companies = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (row) => {
      companies.push(row);
    })
    .on("end", async () => {
      try {
        await Company.insertMany(companies);
        res.send({ message: "Company data imported successfully" });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error importing company data", error });
      } finally {
        // Remove the uploaded file after processing
        fs.unlinkSync(file.path);
      }
    });
});

module.exports = router;
