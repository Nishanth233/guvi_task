const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  departureLocation: String,
  departureCode: String,
  departureTime: String,
  arrivalLocation: String,
  arrivalCode: String,
  arrivalTime: String,
  price: {
    currency: String,
    total: Number,
  },
});

// Add logging to see the structure of each flight
flightSchema.post('find', function (result) {
  console.log('Flight data structure:', result);
});

module.exports = mongoose.model('Flight', flightSchema);
