import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/public/images/2200326.png" alt="Logo" className="w-8 h-8 mr-2" />
          <Link to="/" className="text-xl font-bold">
            Flightgo!
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <Link
            to="/login"
            className="flex items-center bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            <img
              src="\public\images\login.png"
              alt="Login Icon"
              className="w-6 h-6 mr-2"
            />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            <img
              src="\public\images\signup.png"
              alt="Register Icon"
              className="w-6 h-6 mr-2"
            />
            Register
          </Link>
          <Link
            to="/flights"
            className="flex items-center bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            <img
              src="\public\images\flights.png"
              alt="Flights Icon"
              className="w-6 h-6 mr-2"
            />
            Flights
          </Link>
          <Link
            to="/bookings"
            className="flex items-center bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            <img
              src="\public\images\booking.png"
              alt="Bookings Icon"
              className="w-6 h-6 mr-2"
            />
            Bookings
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
