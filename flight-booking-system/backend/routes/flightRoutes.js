const express = require('express');
const flightController = require('../controllers/flightController');
const router = express.Router();

router.get('/search-flights', flightController.searchFlights); // Ensure this route matches

module.exports = router;
