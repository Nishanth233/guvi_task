import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <img src="\images\ICON.png" alt="Logo" className="w-8 h-8 mr-2" />
          <Link to="/" className="text-white transition duration-300">
            College Placement Management
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="hover:text-teal-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-teal-400 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-teal-400 transition duration-300"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                to="/forgot-password"
                className="hover:text-teal-400 transition duration-300"
              >
                Forgot Password
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-teal-400 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
