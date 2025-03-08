import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

const ExploreDestinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/destinations"
        );
        setDestinations(response.data);
        setFilteredDestinations(response.data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        setError("Failed to fetch destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = destinations.filter((destination) =>
      destination.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  if (loading) {
    return <p>Loading destinations...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
    <div className="flex flex-col items-center bg-orange-400 justify-center min-h-screen py-10">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Explore More Destinations
        </h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for destinations"
          className="w-full mb-6 px-4 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
        />
        <ul className="space-y-4">
          {filteredDestinations.map((destination) => (
            <li key={destination.id} className="p-4 bg-gray-100 rounded shadow">
              <p>
                <strong>Destination:</strong> {destination.name}
              </p>
              <p>
                <strong>Country:</strong> {destination.country}
              </p>
              <p>
                <strong>Popular Attractions:</strong>{" "}
                {destination.attractions.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ExploreDestinations;
