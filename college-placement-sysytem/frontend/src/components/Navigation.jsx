import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ role }) => {
  if (!role) {
    return null; // Return null if role is not set yet
  }

  return (
    <nav className="bg-gray-800 p-4">
      {role === "admin" && (
        <>
          <Link to="/" className="text-white px-3">
            Home
          </Link>
          <Link to="/applications" className="text-white px-3">
            Applications
          </Link>
          <Link to="/interviews" className="text-white px-3">
            Interviews
          </Link>
          <Link to="/companies" className="text-white px-3">
            Companies
          </Link>
          <Link to="/placement-drives" className="text-white px-3">
            Placement Drives
          </Link>
          <Link to="/recruitment" className="text-white px-3">
            Recruitment
          </Link>
          <Link to="/academic-records" className="text-white px-3">
            Academic Records
          </Link>
          <Link to="/company-data" className="text-white px-3">
            Company Data
          </Link>
          <Link to="/reports" className="text-white px-3">
            Reports
          </Link>
          <Link to="/register-company" className="text-white px-3">
            Register Company
          </Link>
          <Link to="/submitted-applications" className="text-white px-3">
            Submitted Applications
          </Link>
          <Link to="/logout" className="text-white px-3">
            Logout
          </Link>
        </>
      )}
      {role === "student" && (
        <>
          <Link to="/" className="text-white px-3">
            Home
          </Link>
          <Link to="/applications" className="text-white px-3">
            Applications
          </Link>
          <Link to="/submitted-applications" className="text-white px-3">
            Submitted Applications
          </Link>
          <Link to="/recruitment" className="text-white px-3">
            Recruitment
          </Link>
          <Link to="/reports" className="text-white px-3">
            Reports
          </Link>
          <Link to="/logout" className="text-white px-3">
            Logout
          </Link>
        </>
      )}
      {role === "company" && (
        <>
          <Link to="/" className="text-white px-3">
            Home
          </Link>
          <Link to="/recruitment" className="text-white px-3">
            Recruitment
          </Link>
          <Link to="/register-company" className="text-white px-3">
            Register Company
          </Link>
          <Link to="/reports" className="text-white px-3">
            Reports
          </Link>
          <Link to="/interviews" className="text-white px-3">
            Interviews
          </Link>
          <Link to="/logout" className="text-white px-3">
            Logout
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
