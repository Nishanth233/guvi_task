import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { debounce } from "lodash"; // Import lodash debounce function

const SearchFlights = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState([]);

  // Debounced function to fetch airport suggestions
  const fetchAirportSuggestions = debounce(async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/airports`,
        { params: { keyword: query } }
      );
      setSuggestions(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setSuggestions([]);
    }
  }, 300);

  // Fetch departure suggestions
  useEffect(() => {
    fetchAirportSuggestions(departure, setDepartureSuggestions);
  }, [departure]);

  // Fetch arrival suggestions
  useEffect(() => {
    fetchAirportSuggestions(arrival, setArrivalSuggestions);
  }, [arrival]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/flights`,
        { params: { departure, arrival, date } }
      );
      setFlights(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setFlights([]);
    }
  };

  const handleSelectDeparture = (code) => {
    setDeparture(code);
    setDepartureSuggestions([]);
  };

  const handleSelectArrival = (code) => {
    setArrival(code);
    setArrivalSuggestions([]);
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-orange-400 justify-center min-h-screen py-10">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Search Flights
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Departure:
            </label>
            <input
              type="text"
              placeholder="Departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {Array.isArray(departureSuggestions) &&
              departureSuggestions.length > 0 && (
                <ul className="mt-2 w-full max-w-md bg-white border rounded shadow">
                  {departureSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSelectDeparture(suggestion.iataCode)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {suggestion.name} ({suggestion.iataCode})
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Arrival:
            </label>
            <input
              type="text"
              placeholder="Arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {Array.isArray(arrivalSuggestions) &&
              arrivalSuggestions.length > 0 && (
                <ul className="mt-2 w-full max-w-md bg-white border rounded shadow">
                  {arrivalSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSelectArrival(suggestion.iataCode)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {suggestion.name} ({suggestion.iataCode})
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
        <div
          className="mt-8 w-full max-w-2xl overflow-y-auto bg-white rounded-lg shadow-lg p-6"
          style={{ maxHeight: "60vh" }}
        >
          {Array.isArray(flights) && flights.length > 0 ? (
            <ul className="space-y-4">
              {flights.map((flight) => (
                <li key={flight.id} className="p-4 bg-gray-100 rounded shadow">
                  <p>
                    <strong>Flight Number:</strong>{" "}
                    {flight.flightNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Departure:</strong>{" "}
                    {flight.departureLocation || "N/A"} (
                    {flight.departureCode || "N/A"}) at{" "}
                    {flight.departureTime || "N/A"}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {flight.arrivalLocation || "N/A"}{" "}
                    ({flight.arrivalCode || "N/A"}) at{" "}
                    {flight.arrivalTime || "N/A"}
                  </p>
                  <p>
                    <strong>Price:</strong>{" "}
                    {`${flight.price.currency || "N/A"} ${
                      flight.price.total || "N/A"
                    }`}
                  </p>
                  <Link
                    to={`/book/${flight.id}`}
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Book
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No flights available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchFlights;
