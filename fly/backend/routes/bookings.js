const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight"); // Import Flight model
const sendBookingConfirmation = require("../utils/sendBookingConfirmation");
const jwt = require("jsonwebtoken");

// Middleware: Validate booking request
const validateBookingRequest = (req, res, next) => {
  const { flight, seatsBooked, totalPrice } = req.body;
  if (!flight || !seatsBooked || !totalPrice) {
    return res.status(400).json({
      message: "Missing required fields: flight, seatsBooked, totalPrice",
    });
  }

  if (typeof seatsBooked !== "number" || seatsBooked <= 0) {
    return res.status(400).json({
      message: "seatsBooked must be a positive number.",
    });
  }

  if (typeof totalPrice !== "number" || totalPrice <= 0) {
    return res.status(400).json({
      message: "totalPrice must be a positive number.",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(flight)) {
    return res.status(400).json({ message: "Invalid flight ID format." });
  }

  next();
};

// Middleware: Authentication (JWT validation)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Route: Fetch all bookings for a specific user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate({
      path: "flight",
      select:
        "flightNumber departureLocation departureCode departureTime arrivalLocation arrivalCode arrivalTime price",
    });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// Route: Create a new booking
router.post("/", authMiddleware, validateBookingRequest, async (req, res) => {
  const { flight, seatsBooked, totalPrice } = req.body;

  try {
    const flightExists = await Flight.findById(flight);
    if (!flightExists) {
      return res.status(404).json({ message: "Flight not found." });
    }

    const newBooking = new Booking({
      user: req.user.id,
      flight: new mongoose.Types.ObjectId(flight),
      seatsBooked,
      totalPrice,
      status: "Confirmed",
    });

    await newBooking.save();

    // Send booking confirmation email
    try {
      await sendBookingConfirmation(newBooking);
    } catch (emailError) {
      console.error("[ERROR] Failed to send booking confirmation email:", emailError.message);
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking." });
  }
});

// Route: Cancel a booking
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Cancelled" },
      { new: true }
    ).populate({
      path: "flight",
      select:
        "flightNumber departureLocation departureCode departureTime arrivalLocation arrivalCode arrivalTime price",
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking." });
  }
});

module.exports = router;
