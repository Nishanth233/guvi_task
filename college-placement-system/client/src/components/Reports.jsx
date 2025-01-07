import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Reports = () => {
  const [metrics, setMetrics] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:5000/metrics");
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header/>
      <h2>Reports and Analytics</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <p>Number of Students Placed: {metrics.studentsPlaced}</p>
      <p>Number of Offers Accepted: {metrics.offersAccepted}</p>
      <p>Placement Success Rate: {metrics.successRate}%</p>
       <Footer/>
    </div>
  );
};

export default Reports;
