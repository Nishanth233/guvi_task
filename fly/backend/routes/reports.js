const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");
const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Add this import statement

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

function getNextDayDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

function getFirstDayOfYear() {
  const date = new Date(new Date().getFullYear(), 0, 1);
  return date.toISOString().split("T")[0];
}

router.get("/live/:origin/:destination", async (req, res) => {
  const { origin, destination } = req.params;

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: getNextDayDate(), // Dynamically set the next day's date
      adults: "1",
    });

    if (response.data) {
      const reports = response.data.map((flight) => ({
        id: flight.id,
        departure: flight.itineraries[0].segments[0].departure.at,
        arrival: flight.itineraries[0].segments[0].arrival.at,
        price: flight.price.total,
        currency: flight.price.currency,
      }));

      res.json(reports);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/sales-performance", async (req, res) => {
  try {
    const response = await amadeus.analytics.itineraryPriceMetrics.get({
      originIataCode: "LAX",
      destinationIataCode: "JFK",
      departureDate: getFirstDayOfYear(),
    });

    if (response.data) {
      const salesPerformance = response.data.map((performance) => ({
        departureDate: performance.departureDate,
        averagePrice: performance.priceMetrics?.[0]?.amount || 0,
        currency: performance.currencyCode,
      }));

      res.json(salesPerformance);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch user activity for the logged-in user
router.get("/user-activity", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userActivity = await User.aggregate([
      { $match: { _id: user._id } },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "user",
          as: "bookings",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          bookingCount: { $size: { $ifNull: ["$bookings", []] } },
        },
      },
    ]);

    res.json(userActivity);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
