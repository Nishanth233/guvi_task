const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
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

  if (typeof seatsBooked !== "number" || typeof totalPrice !== "number") {
    return res.status(400).json({
      message: "Invalid data types for seatsBooked or totalPrice.",
    });
  }

  // Validate flight ID as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(flight)) {
    return res.status(400).json({ message: "Invalid flight ID format." });
  }

  next();
};

// Middleware: Authentication (JWT validation)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("[ERROR] Authorization header is missing.");
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.error("[ERROR] No token provided.");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.user) {
      console.error("[ERROR] Invalid token structure.");
      return res.status(401).json({ message: "Invalid token structure" });
    }

    req.user = decoded.user;
    console.log("[INFO] User authenticated:", req.user);
    next();
  } catch (err) {
    console.error("[ERROR] Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Route: Fetch all bookings for a specific user
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("[INFO] Fetching bookings for user:", req.user.id);

    const bookings = await Booking.find({ user: req.user.id });

    if (!bookings.length) {
      console.log("[INFO] No bookings found for user:", req.user.id);
      return res.status(404).json({ message: "No bookings found." });
    }

    console.log("[INFO] Fetched bookings:", bookings);
    res.json(bookings);
  } catch (err) {
    console.error("[ERROR] Failed to fetch bookings:", err.message);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// Route: Create a new booking
router.post("/", authMiddleware, validateBookingRequest, async (req, res) => {
  const { flight, seatsBooked, totalPrice } = req.body;

  try {
    console.log("[INFO] Creating a new booking...");

    const newBooking = new Booking({
      user: req.user.id, // User ID from token
      flight: mongoose.Types.ObjectId(flight), // Cast flight to ObjectId
      seatsBooked,
      totalPrice,
      status: "Confirmed",
    });

    await newBooking.save();
    console.log("[INFO] Booking created successfully:", newBooking);

    // Send booking confirmation email
    try {
      await sendBookingConfirmation(newBooking);
      console.log("[INFO] Booking confirmation email sent.");
    } catch (emailError) {
      console.error(
        "[ERROR] Failed to send booking confirmation email:",
        emailError.message
      );
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    console.error("[ERROR] Failed to create booking:", err.message);
    res.status(500).json({ message: "Failed to create booking." });
  }
});

// Route: Cancel a booking
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.id;
    console.log("[INFO] Canceling booking with ID:", bookingId);

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Cancelled" },
      { new: true }
    );

    if (booking) {
      console.log("[INFO] Booking canceled successfully:", booking);
      res.json(booking);
    } else {
      console.error("[ERROR] Booking not found with ID:", bookingId);
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (err) {
    console.error("[ERROR] Failed to cancel booking:", err.message);
    res.status(500).json({ message: "Failed to cancel booking." });
  }
});

module.exports = router;
