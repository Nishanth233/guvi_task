import React, { useState, useEffect } from "react";
import axios from "axios";

const LiveReports = () => {
  const [liveReports, setLiveReports] = useState([]);
  const [origin, setOrigin] = useState("LAX"); // Default value
  const [destination, setDestination] = useState("JFK"); // Default value

  const fetchLiveReports = async () => {
    try {
      const response = await axios.get(
        `https://flight-uxxl.onrender.com/api/reports/live/${origin}/${destination}`
      );
      setLiveReports(response.data);
    } catch (err) {
      console.error("Error fetching live reports:", err);
    }
  };

  useEffect(() => {
    fetchLiveReports();
  }, []);

  return (
    <div>
      <h2 className="text-3xl  font-bold mb-6 text-gray-900">Live Reports</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchLiveReports();
        }}
        className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <div className="mb-4 ">
          <label className="block text-gray-700 font-bold mb-2">Origin:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Destination:
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fetch Live Reports
        </button>
      </form>
      <div className="overflow-y-auto " style={{ maxHeight: "60vh" }}>
        {liveReports.length > 0 ? (
          <ul className="space-y-4">
            {liveReports.map((report) => (
              <li key={report.id} className="p-4 bg-orange-200 rounded shadow">
                <span className="block text-gray-900">
                  Departure: {new Date(report.departure).toLocaleString()}
                </span>
                <span className="block text-gray-900">
                  Arrival: {new Date(report.arrival).toLocaleString()}
                </span>
                <span className="block text-gray-900">
                  Price: {report.price} {report.currency}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No live reports available.</p>
        )}
      </div>
    </div>
  );
};

export default LiveReports;
