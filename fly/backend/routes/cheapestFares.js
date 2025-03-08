const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");
const fs = require("fs");
const path = require("path");

// Initialize Amadeus API
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Helper function to generate a future date
const getFutureDate = (daysAhead) => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysAhead);
  return futureDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
};

// Function to load all IATA codes dynamically
const loadIATACodes = () => {
  const filePath = path.join(__dirname, "../data/airports.json"); // Path to the JSON file with all IATA codes
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Fetch the cheapest fares
router.get("/", async (req, res) => {
  const iataCodes = loadIATACodes();

  // Automatically rotate through the list based on the current date
  const currentDay = new Date().getDate();
  const randomOrigin = iataCodes.origins[currentDay % iataCodes.origins.length]; // Rotate through the list based on the current day
  const randomDestination =
    iataCodes.destinations[
      Math.floor(Math.random() * iataCodes.destinations.length)
    ]; // Randomly select a destination

  const randomDate = getFutureDate(7); // Example: Get the date 7 days from now

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: randomOrigin,
      destinationLocationCode: randomDestination,
      departureDate: randomDate,
      adults: 1,
      max: 10, // Fetch up to 10 results
    });

    const fares = response.data
      .map((offer) => ({
        origin: randomOrigin, // Add origin to the response
        destination: randomDestination, // Add destination to the response
        date: offer.itineraries[0].segments[0].departure.at,
        price: parseFloat(offer.price.total),
        currency: offer.price.currency,
      }))
      .sort((a, b) => a.price - b.price); // Sort by price in ascending order

    res.json(fares);
  } catch (error) {
    console.error("Error fetching cheapest fares:", error);
    res.status(500).json({ message: "Failed to fetch cheapest fares." });
  }
});

module.exports = router;
