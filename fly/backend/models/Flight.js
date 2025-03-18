const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  departureLocation: { type: String, required: true },
  departureCode: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalLocation: { type: String, required: true },
  arrivalCode: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: {
    currency: { type: String, required: true },
    total: { type: Number, required: true },
  },
});

flightSchema.post('find', function (result) {
  console.log('Flight data structure:', result);
});

module.exports = mongoose.model('Flight', flightSchema);
