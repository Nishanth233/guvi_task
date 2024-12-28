const Flight = require('../models/Flight');

const searchFlights = async (searchData) => {
  const { departure, arrival, date } = searchData;
  try {
    return await Flight.find({
      departureLocation: departure,
      arrivalLocation: arrival,
      date: new Date(date)
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw new Error('Could not fetch flights');
  }
};

const flightService = {
  searchFlights,
};

module.exports = flightService;
