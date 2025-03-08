import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const FlightStatus = () => {
  const { flightNumber } = useParams();
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        console.log("Fetching data for flight number:", flightNumber); // Log the flight number
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/flights/live/${flightNumber}`
        );
        console.log("API Response:", response.data); // Log the entire API response
        setFlightData(response.data);
      } catch (err) {
        console.error("Failed to fetch flight data:", err);
        setError("Failed to fetch flight data.");
      }
    };

    if (flightNumber) {
      fetchFlightData();
    }
  }, [flightNumber]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!flightData) {
    return <p className="text-gray-500">Loading flight data...</p>;
  }

  return (
    <div>
    <div className="p-6 m-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Flight Status</h2>
      {flightData ? (
        <>
          <p>
            <strong>Flight Number:</strong> {flightData.flight.iata}
          </p>
          <p>
            <strong>Airline:</strong> {flightData.airline.name}
          </p>
          <p>
            <strong>Departure:</strong> {flightData.departure.airport} at{" "}
            {flightData.departure.scheduled}
          </p>
          <p>
            <strong>Arrival:</strong> {flightData.arrival.airport} at{" "}
            {flightData.arrival.scheduled}
          </p>
          <p>
            <strong>Current Status:</strong> {flightData.flight_status}
          </p>
          <p>
            <strong>Live Position:</strong>{" "}
            {flightData.live
              ? `${flightData.live.latitude}, ${flightData.live.longitude}`
              : "Not available"}
          </p>
        </>
      ) : (
        <p className="text-gray-500">Flight data not available.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default FlightStatus;
