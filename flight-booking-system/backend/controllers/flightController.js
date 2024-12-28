const flightService = require('../services/flightService');

const searchFlights = async (req, res) => {
  const { departure, arrival, date } = req.query;
  try {
    const flights = await flightService.searchFlights({ departure, arrival, date });
    res.json(flights);
  } catch (err) {
    console.error('Failed to fetch flights:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const flightController = {
  searchFlights,
};

module.exports = flightController;
