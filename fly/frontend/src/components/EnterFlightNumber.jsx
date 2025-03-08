import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const EnterFlightNumber = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flightNumber) {
      navigate(`/status/${flightNumber}`);
    }
  };

  return (
    <div>
    <div className="flex flex-col items-center justify-center bg-orange-400 min-h-screen py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Check Flight Status
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Flight Number:
            </label>
            <input
              type="text"
              placeholder="Enter flight number"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Check Status
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default EnterFlightNumber;
