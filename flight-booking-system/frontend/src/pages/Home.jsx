import React, { useState, useEffect } from "react";
import FlightSearch from "../components/FlightSearch";
import FlightList from "../components/FlightList";
import Promotion from "../components/Promotion";
import PopularRoutes from "../components/PopularRoutes";
import TravelTips from "../components/TravelTips";
import FAQs from "../components/FAQs";
import FlightTypesSlide from "../components/FlightTypesSlide";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [travelTips, setTravelTips] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    departure: "",
    arrival: "",
    date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setPromotions(fetchPromotions());
    setPopularRoutes(fetchPopularRoutes());
    setTravelTips(fetchTravelTips());
  }, []);

  const handleDestinationClick = (destination) => {
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      arrival: destination,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center bg-white p-8 shadow-md w-full  mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="md:w-1/2 p-4">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to Our Flight Booking System!</h1>
            <div className="text-xl bg-gray-100 p-4 rounded">
              <p className="mb-4">Our website is designed to make your travel experience seamless and enjoyable. Here’s what you can do:</p>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Register:</strong> Create an account to access personalized features.</li>
                <li><strong>Log In:</strong> Access your account and manage your bookings.</li>
                <li><strong>Search Flights:</strong> Find available flights based on your preferences.</li>
                <li><strong>Book Flights:</strong> Secure your seat with easy booking options.</li>
                <li><strong>Manage Bookings:</strong> View, modify, or cancel your reservations.</li>
                <li><strong>Make Payments:</strong> Pay for your bookings securely through our platform.</li>
                <li><strong>Receive Notifications:</strong> Get updates and confirmations for your travel plans.</li>
              </ul>
              <p className="mb-4">Enjoy a hassle-free travel planning experience with our user-friendly interface and secure features. Happy travels!</p>
              <p>If you have any questions or need further assistance, feel free to reach out! </p>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center">
            <img
              src="/public/images/mar24_uae_krabi_1B_1.webp"
              alt="Beautiful Landscape"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
      <FlightSearch setFlights={setFlights} searchCriteria={searchCriteria} />
      <FlightList flights={flights} />
      <div className="border m-4 p-4 shadow-md bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
  <h2 className="text-2xl text-orange-600 font-bold mb-4">Start planning your adventure</h2>
  <ul className="list-none p-0">
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Tickets to Istanbul
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Cheap return tickets to Melbourne
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Cheap tickets to Moscow
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Cheap flights to Vancouver
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Plane tickets to Seoul
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Flights to Rome
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Cheap tickets to Kuala Lumpur
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Return plane tickets to Zayed International
    </li>
    <li className="flex items-center p-2 mb-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300">
      <img src="/public/images/plane.png" alt="icon" className="w-6 h-6 mr-2" /> Plane tickets to Chicago
    </li>
  </ul>
</div>

      <Promotion promotions={promotions} />
      <FlightTypesSlide />
      <PopularRoutes routes={popularRoutes} />
      <TravelTips tips={travelTips} />
      <FAQs /> {/* Add the FAQs component */}
    </div>
  );
};

// Mock data fetching functions
const fetchPromotions = () => [
  {
    id: 1,
    title: "50% Off on International Flights",
    description: "Book now and save big on your international travel!",
  },
  {
    id: 2,
    title: "Special Discounts for Students",
    description: "Students get 30% off on all domestic flights.",
  },
];

const fetchPopularRoutes = () => [
  { id: 1, route: "Delhi to Mumbai Flights" },
  { id: 2, route: "Bangalore to Hyderabad Flights" },
  { id: 3, route: "Chennai to Coimbatore Flights" },
];

const fetchTravelTips = () => [
  { id: 1, tip: "Arrive at the airport at least 2 hours before your flight." },
  { id: 2, tip: "Always carry a copy of your important documents." },
  { id: 3, tip: "Keep yourself hydrated during the flight." },
];

export default Home;
