const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sendBookingConfirmation = require("../utils/sendBookingConfirmation");
const jwt = require("jsonwebtoken");

// Middleware to verify the token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Fetch all bookings for a specific user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    console.log("Fetched bookings:", bookings);
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// Create a new booking
router.post("/", authMiddleware, async (req, res) => {
  const { flight, seatsBooked, totalPrice } = req.body;
  const newBooking = new Booking({
    user: req.user.id,
    flight,
    seatsBooked,
    totalPrice,
    status: "Confirmed",
  });
  await newBooking.save();

  // Send booking confirmation email
  await sendBookingConfirmation(newBooking);
  res.json(newBooking);
});

// Cancel a booking
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Cancelled" },
      { new: true }
    );
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking." });
  }
});

module.exports = router;
