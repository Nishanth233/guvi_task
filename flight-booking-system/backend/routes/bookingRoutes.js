const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Define your routes here
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.bookFlight);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;

