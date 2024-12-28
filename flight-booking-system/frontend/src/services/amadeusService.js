import axios from 'axios';

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
      'grant_type=client_credentials&client_id=' + import.meta.env.VITE_AMADEUS_API_KEY +
      '&client_secret=' + import.meta.env.VITE_AMADEUS_API_SECRET,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to fetch access token:', error);
    throw error;
  }
};

const searchFlights = async (departure, arrival, date) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      params: {
        originLocationCode: departure,
        destinationLocationCode: arrival,
        departureDate: date,
        adults: 1
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Flight Offers Response:', response.data);  // Log the flight offers response to inspect

    const flights = response.data.data.map(offer => {
      const segment = offer.itineraries[0].segments[0];  // Accessing the first segment of the first itinerary
      return {
        airline: segment.carrierCode,
        flightNumber: segment.number,
        duration: offer.itineraries[0].duration,
        departure: `${segment.departure.iataCode} (${segment.departure.at})`,
        arrival: `${segment.arrival.iataCode} (${segment.arrival.at})`,
        price: {
          currency: offer.price.currency,
          total: offer.price.total,
          base: offer.price.base,
          fees: offer.price.fees.map(fee => fee.amount),
          grandTotal: offer.price.grandTotal
        }
      };
    });

    console.log('Mapped Flight Data:', flights);  // Log the mapped flight data to inspect
    return flights;
  } catch (error) {
    console.error('Failed to fetch flights:', error);
    throw error;
  }
};

export { searchFlights };
