const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
const Booking = require('../models/booking');

// Create a new booking
exports.bookFlight = async (req, res) => {
  const { flight, seatNumber, name, phone, email } = req.body;

  const newBooking = new Booking({
    flight,
    seatNumber,
    user: {
      name,
      phone,
      email,
    },
    status: 'Confirmed'
  });

  try {
    const savedBooking = await newBooking.save();
    console.log('New Booking:', savedBooking);

    const subject = 'Booking Confirmation';
    const text = `Your booking is confirmed. Booking ID: ${savedBooking._id}, Flight: ${savedBooking.flight}, Seat Number: ${savedBooking.seatNumber}, Passenger Name: ${savedBooking.user.name}, Status: ${savedBooking.status}`;
    sendEmail(email, subject, text);

    const smsMessage = `Your booking is confirmed. Booking ID: ${savedBooking._id}, Flight: ${savedBooking.flight}, Seat Number: ${savedBooking.seatNumber}, Passenger Name: ${savedBooking.user.name}, Status: ${savedBooking.status}`;
    sendSMS(phone, smsMessage);

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error booking flight:', error); // Log the error for more details
    res.status(500).json({ error: 'Failed to book flight' });
  }
};

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Fetch a single booking by ID
exports.getBookingById = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    await Booking.findByIdAndDelete(bookingId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
