import axios from "axios";

const API_URL = `https://flight-4ll6.onrender.com/api/amadeus/search-flights`;

const searchFlights = async (searchData) => {
  const response = await axios.get(API_URL, {
    params: searchData,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AMADEUS_API_KEY}`,
    },
  });
  return response.data;
};

const flightService = {
  searchFlights,
};

export default flightService;
