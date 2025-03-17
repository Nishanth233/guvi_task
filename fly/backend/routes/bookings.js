const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sendBookingConfirmation = require("../utils/sendBookingConfirmation");
const jwt = require("jsonwebtoken");

// Middleware to verify the token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("[ERROR] Authorization header is missing.");
    return res
      .status(401)
      .json({ message: "Authorization header is missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("[ERROR] Invalid token:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token." });
  }
};

// Fetch all bookings for a specific user
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
    console.error("[ERROR] Failed to fetch bookings:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch bookings. Please try again later." });
  }
});

// Create a new booking
router.post("/", authMiddleware, async (req, res) => {
  const { flight, seatsBooked, totalPrice } = req.body;

  try {
    console.log("[INFO] Creating a new booking...");
    const newBooking = new Booking({
      user: req.user.id,
      flight,
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
        emailError
      );
    }

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    console.error("[ERROR] Failed to create booking:", err);
    res
      .status(500)
      .json({ message: "Failed to create booking. Please try again later." });
  }
});

// Cancel a booking
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
    console.error("[ERROR] Failed to cancel booking:", err);
    res
      .status(500)
      .json({ message: "Failed to cancel booking. Please try again later." });
  }
});

module.exports = router;
