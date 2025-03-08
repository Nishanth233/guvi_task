import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

// In-memory cache store
const cache = {
  data: null,
  timestamp: null,
  ttl: 60000, // Time to live: 1 minute
};

const Home = () => {
  const [cheapestFares, setCheapestFares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCheapestFares = async (retryCount = 0) => {
    if (cache.data && Date.now() - cache.timestamp < cache.ttl) {
      setCheapestFares(cache.data);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cheapest-fares"
      );
      cache.data = response.data;
      cache.timestamp = Date.now();
      setCheapestFares(response.data);
    } catch (err) {
      if (err.response && err.response.status === 429 && retryCount < 3) {
        const retryAfter = 3 ** retryCount * 1000; // Exponential backoff: 1s, 3s, 9s
        setTimeout(() => fetchCheapestFares(retryCount + 1), retryAfter);
      } else {
        setError("Failed to fetch cheapest fares. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheapestFares();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full bg-orange-500 text-white p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Flight Booking</h1>
        <p className="text-xl mb-4  text-center">
          Your one-stop solution for all your flight booking needs. Find and
          book flights at the best prices, explore destinations, and enjoy a
          seamless travel experience.
        </p>
        <img
          src="/images/img.jpg"
          alt="Flight Booking"
          className="max-w-4xl mb-8 bg-white p-10 rounded-lg  shadow-lg"
        />
      </div>
      <div className="flex-grow p-10 bg-orange-400">
        <section className="bg-white p-8 rounded-lg  shadow-md mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside mb-6 text-gray-700 text-lg">
            <li>Easy and fast flight booking process.</li>
            <li>Best prices guaranteed with no hidden fees.</li>
            <li>Wide range of destinations to explore.</li>
            <li>Real-time updates on flight status and booking information.</li>
            <li>Secure payment processing with multiple options.</li>
            <li>24/7 customer support for a hassle-free experience.</li>
          </ul>
        </section>
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Paris</h3>
              <p className="text-gray-700">
                Explore the City of Light, known for its iconic Eiffel Tower,
                art museums, and exquisite cuisine.
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Tokyo</h3>
              <p className="text-gray-700">
                Discover the bustling metropolis with its blend of modern
                skyscrapers, historic temples, and cherry blossoms.
              </p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">New York</h3>
              <p className="text-gray-700">
                Experience the Big Apple, famous for its skyline, Broadway
                shows, and diverse culture.
              </p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Goa</h3>
              <p className="text-gray-700">
                Relax on the stunning beaches, enjoy the vibrant nightlife, and
                indulge in water sports.
              </p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Dubai</h3>
              <p className="text-gray-700">
                Explore the luxury shopping, ultramodern architecture, and
                lively nightlife scene.
              </p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">London</h3>
              <p className="text-gray-700">
                Visit the historic landmarks, world-class museums, and enjoy the
                diverse culinary scene.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Link
              to="/explore"
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700 text-lg"
            >
              Explore Destinations
            </Link>
          </div>
        </section>
        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Cheapest Fares
          </h2>
          {loading ? (
            <p className="text-center text-gray-700">
              Loading cheapest fares...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700 text-lg">
              {cheapestFares.map((fare, index) => (
                <li key={index} className="mb-4">
                  <p>
                    <strong>Origin:</strong> {fare.origin}
                  </p>
                  <p>
                    <strong>Destination:</strong> {fare.destination}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(fare.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Price:</strong> {fare.currency} {fare.price}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-center mt-6">
            <Link
              to="/cheapest-fares"
              className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-lg"
            >
              Find Cheapest Fares
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
