import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const CheapestFares = () => {
  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const response = await axios.get(
          "https://flight-uxxl.onrender.com/api/cheapest-fares"
        );
        console.log('API Response:', response.data); // Log the API response to check the data
        setFares(response.data);
      } catch (err) {
        console.error("Failed to fetch fares:", err);
        setError("Failed to fetch fares.");
      } finally {
        setLoading(false);
      }
    };

    fetchFares();
  }, []);

  if (loading) {
    return <p>Loading cheapest fares...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cheapest Fares</h2>
      <ul className="space-y-4">
        {fares.map((fare, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded shadow">
            <p><strong>Origin:</strong> {fare.origin}</p> {/* Display the dynamically chosen origin */}
            <p><strong>Destination:</strong> {fare.destination}</p>
            <p><strong>Date:</strong> {new Date(fare.date).toLocaleDateString()}</p>
            <p><strong>Price:</strong> {fare.currency} {fare.price}</p>
          </li>
        ))}
      </ul>
      <Link to="/explore">
        <button className="mt-6 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
          Continue exploring destinations
        </button>
      </Link>
    </div>
    <Footer/>
    </div>
  );
};

export default CheapestFares;
