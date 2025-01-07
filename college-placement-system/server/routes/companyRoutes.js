const express = require("express");
const router = express.Router();
const {
  addCompany,
  getAllCompanies,
} = require("../controllers/companyController");

router.post("/add", addCompany);
router.get("/", getAllCompanies);

module.exports = router;
