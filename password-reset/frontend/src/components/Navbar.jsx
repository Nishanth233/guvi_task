import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Password Reset Project
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
          <Link to="/forgot-password" className="text-white hover:text-gray-200">Forgot Password</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
