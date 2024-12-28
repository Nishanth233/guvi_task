import React, { useState } from "react";
import { searchFlights } from "../services/amadeusService";

const FlightSearch = ({ setFlights }) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = async () => {
    try {
      const flights = await searchFlights(departure.toUpperCase(), arrival.toUpperCase(), date);
      console.log('Flights:', flights);  // Log the flights to inspect
      setFlights(flights);
    } catch (error) {
      console.error('Failed to fetch flights:', error);
      setFlights([]);
    }
  };

  return (
    <div className="border m-4 p-4">
      <h1 className="text-2xl text-orange-600 font-bold mb-4">FlightSearch</h1>
      <input
        type="text"
        id="departure"
        name="departure"
        placeholder="Departure (e.g., MAA)"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="text"
        id="arrival"
        name="arrival"
        placeholder="Arrival (e.g., CJB)"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 m-2">
        Search Flights
      </button>
    </div>
  );
};

export default FlightSearch;
