import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-700 text-white p-4 shadow-md">
      <h1 className="text-2xl font-bold flex items-center">
        <img src="\images\ICON.png" alt="Logo" className="w-8 h-8 mr-2" />
        <Link to="/" className="text-white transition duration-300">
          College Placement Management
        </Link>
      </h1>
      <nav className="mt-2">
        <Link to="/" className="px-2">
          Home
        </Link>
        <Link to="/register-student" className="px-2">
          Register Student
        </Link>
        <Link to="/schedule-interview" className="px-2">
          Schedule Interview
        </Link>
        <Link to="/manage-companies" className="px-2">
          Manage Companies
        </Link>
        <Link to="/manage-placement-drives" className="px-2">
          Manage Placement Drives
        </Link>
        <Link to="/academic-records" className="px-2">
          Academic Records
        </Link>
        <Link to="/reports" className="px-2">
          Reports
        </Link>
        <Link to="/scheduled-interviews" className="px-2">
          Scheduled Interviews
        </Link>
      </nav>
    </header>
  );
};

export default Header;

