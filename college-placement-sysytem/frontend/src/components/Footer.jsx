import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <img src="\images\ICON.png" alt="Logo" className="w-8 h-8 mr-2" />
            <div>
              <h2 className="text-lg font-bold">
                College Placement Management System
              </h2>
              <p className="text-sm">
                © 2025 Company Name. All rights reserved.
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-gray-400 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link to="/contact-us" className="text-gray-400 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
