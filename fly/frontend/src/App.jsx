import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import SearchFlights from "./components/SearchFlights";
import BookFlight from "./components/BookFlight";
import Bookings from "./components/Bookings";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Reports from "./components/Reports";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheapestFares from "./components/CheapestFares";
import FlightStatus from "./components/FlightStatus";
import ExploreDestinations from "./components/ExploreDestinations";
import EnterFlightNumber from "./components/EnterFlightNumber"; 
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Cancellation from "./pages/Cancellation";
import Refund from "./pages/Refund";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Security from "./pages/Security";
import Cookie from "./pages/Cookie";

const stripePromise = loadStripe(
  "pk_test_51QZ7VmAhiFofbKIxOPJCS4V0GrHlkJgJUssfgY75whYGhTWtUUAQm6ULoNqNB8SyhBclmdmCtGl9tX7m7YS79zuo00QN6vCxTt"
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <Link to="/" className="text-xl font-bold">
            Flight Booking
          </Link>
          <div>
            <Link
              to="/search"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
            >
              Search Flights
            </Link>
            <Link
              to="/status"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 mr-2"
            >
              Flight Status
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
                >
                  Profile
                </Link>
                <Link
                  to="/reports"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                >
                  Reports
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 mr-2"
                >
                  Booking
                </Link>
                <LogoutButton setIsLoggedIn={setIsLoggedIn} />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchFlights />} />
          <Route path="/book/:id" element={<BookFlight />} />
          <Route path="/dashboard" element={<Bookings />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/cheapest-fares" element={<CheapestFares />} />
          <Route path="/status" element={<EnterFlightNumber />} />
          <Route path="/status/:flightNumber" element={<FlightStatus />} />
          <Route path="/explore" element={<ExploreDestinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/security" element={<Security />} />
          <Route path="/cookie" element={<Cookie />} />
        </Routes>
      </Router>
    </Elements>
  );
};

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Navigate to home page after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default App;
