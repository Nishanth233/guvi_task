import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesPerformance = () => {
  const [salesPerformance, setSalesPerformance] = useState([]);

  const fetchSalesPerformance = async () => {
    try {
      const response = await axios.get(
        `https://flight-uxxl.onrender.com/api/reports/sales-performance`
      );
      setSalesPerformance(response.data);
    } catch (err) {
      console.error("Error fetching sales performance:", err);
    }
  };

  useEffect(() => {
    fetchSalesPerformance();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Sales Performance
      </h2>
      <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
        {salesPerformance.length > 0 ? (
          <ul className="space-y-4">
            {salesPerformance.map((performance) => (
              <li
                key={`${performance.departureDate}-${performance.averagePrice}`}
                className="p-4 bg-white rounded shadow"
              >
                <span className="block text-gray-900">
                  Departure Date: {performance.departureDate}
                </span>
                <span className="block text-gray-900">
                  Average Price: ${performance.averagePrice}{" "}
                  {performance.currency}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No sales performance data available.</p>
        )}
      </div>
    </div>
  );
};

export default SalesPerformance;
