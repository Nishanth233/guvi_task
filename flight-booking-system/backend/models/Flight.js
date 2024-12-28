const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  departureLocation: { type: String, required: true },
  arrivalLocation: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model('Flight', FlightSchema);
