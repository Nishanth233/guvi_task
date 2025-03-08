const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");

// Amadeus API setup
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Get airport suggestions based on keyword
router.get("/", async (req, res) => {
  const { keyword } = req.query;
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.airport,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
