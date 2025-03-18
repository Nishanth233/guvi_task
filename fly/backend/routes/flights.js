const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");
const axios = require("axios");
const mongoose = require("mongoose"); // Import mongoose for ObjectId generation
const Flight = require("../models/Flight");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Fetch flights based on search criteria
router.get("/", async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    console.log("Flight search request:", { departure, arrival, date });

    // Make Amadeus API call
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: departure,
      destinationLocationCode: arrival,
      departureDate: date,
      adults: "1",
    });

    if (response.data) {
      console.log("Flights found:", response.data);

      const flights = await Promise.all(
        response.data.map(async (flight) => {
          const flightNumber =
            flight.itineraries[0].segments[0].carrierCode +
            flight.itineraries[0].segments[0].number;

          // Check if flight already exists in the database
          let existingFlight = await Flight.findOne({
            flightNumber,
            departureTime: flight.itineraries[0].segments[0].departure.at,
          });

          if (!existingFlight) {
            // Save new flight to the database
            const newFlight = new Flight({
              flightNumber,
              departureLocation: departure,
              departureCode: departure,
              departureTime: flight.itineraries[0].segments[0].departure.at,
              arrivalLocation: arrival,
              arrivalCode: arrival,
              arrivalTime: flight.itineraries[0].segments[0].arrival.at,
              price: {
                currency: flight.price.currency,
                total: flight.price.total,
              },
            });

            existingFlight = await newFlight.save(); // Save flight and use the saved data
            console.log("[INFO] New flight saved:", existingFlight);
          } else {
            console.log("[INFO] Flight already exists:", existingFlight);
          }

          return existingFlight; // Return the existing or new flight
        })
      );

      res.json(flights); // Send flights from the database
    } else {
      console.log("No flights found");
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching flights from Amadeus:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch real-time flight data using Aviationstack
router.get("/live/:flightNumber", async (req, res) => {
  const { flightNumber } = req.params;
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights`,
      {
        params: {
          access_key: process.env.AVIATIONSTACK_API_KEY,
          flight_iata: flightNumber,
        },
      }
    );
    console.log(
      "API Request URL:",
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&flight_iata=${flightNumber}`
    );
    const flightData = response.data.data[0];
    console.log("API Response Data:", flightData); // Log the response data
    res.json(flightData);
  } catch (error) {
    console.error("Error fetching live flight data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
