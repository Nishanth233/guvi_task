const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flight: { type: String, required: true },
  seatNumber: { type: String, required: true },
  user: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  status: { type: String, default: 'Confirmed' }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
