const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure user is required
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  }, // Ensure flight is required
  seatsBooked: { type: Number, required: true, min: 1 }, // Add validation for seatsBooked
  totalPrice: { type: Number, required: true, min: 0 }, // Add validation for positive totalPrice
  status: {
    type: String,
    default: "Confirmed",
    enum: ["Confirmed", "Cancelled"],
  }, // Limit status values
});

module.exports = mongoose.model("Booking", bookingSchema);
