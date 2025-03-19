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

    // Make Amadeus API call
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: departure,
      destinationLocationCode: arrival,
      departureDate: date,
      adults: "1",
    });

    if (response.data) {
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

            existingFlight = await newFlight.save();
          }

          return existingFlight;
        })
      );

      res.json(flights);
    } else {
      res.json([]);
    }
  } catch (error) {
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
    const flightData = response.data.data[0];
    res.json(flightData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
