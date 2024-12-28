const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

const bookFlight = async (bookingData) => {
  const { flightId, seatNumber, user } = bookingData;
  const flight = await Flight.findById(flightId);

  if (flight.availableSeats <= 0) {
    throw new Error('No seats available');
  }

  const booking = new Booking({
    flight: flightId,
    seatNumber,
    user,
  });

  await booking.save();

  flight.availableSeats -= 1;
  await flight.save();

  return booking;
};

const bookingService = {
  bookFlight,
};

module.exports = bookingService;
