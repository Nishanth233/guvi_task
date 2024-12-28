import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8 w-full">
      <div className="container mx-auto px-4">
        <div className="mt-8">
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              Popular Flight Sectors
            </h5>
            <p>
              Kolkata to Delhi Flight | Hyderabad to Delhi Flight | Chennai to
              Hyderabad Flight | Delhi to Guwahati Flight | Lucknow to Delhi
              Flight | Nagpur to Mumbai Flight | Ranchi to Delhi Flight |
              Ahmedabad to Goa Flight | Mumbai to Chandigarh Flight | Pune to
              Kolkata Flight | Bangalore to Bhubaneshwar Flight | Bangalore to
              Guwahati Flight | Chennai to Goa Flight | Chennai to Kolkata
              Flight | Delhi to Jaipur Flight | Delhi to Leh Flight | Hyderabad
              to Goa Flight | Bangalore to Ranchi Flight | Delhi to Bagdogra
              Flight | Srinagar to Delhi Flight
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              Top Routes
            </h5>
            <p>
              Chandigarh to Delhi Flight | Delhi to Bhopal Flight | Delhi to
              Dehradun Flight | Delhi to Udaipur Flight | Hyderabad to Tirupati
              Flight | Kolkata to Chennai Flight | Kolkata to Guwahati Flight |
              Mumbai to Amritsar Flight | Mumbai to Dehradun Flight | Indore to
              Goa Flight | Jaipur to Delhi Flight | Kolkata to Bagdogra Flight |
              Patna to Bangalore Flight | Varanasi to Delhi Flight | Ahmedabad
              to Kolkata Flight | Delhi to Gorakhpur Flight | Guwahati to
              Kolkata Flight | Indore to Bangalore Flight | Jaipur to Pune
              Flight | Mumbai to Raipur Flight
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              Customer Support
            </h5>
            <p>
              If you need assistance, our support team is here to help you 24/7.
              Reach out to us via email at support@example.com or call us at
              +91-1234567890.
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              Travel Essentials
            </h5>
            <p>
              Check your PNR status, explore our latest offers, and get the
              latest updates on airline routes and train running status to make
              your travel experience smoother.
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">About Us</h5>
            <p>
              We are dedicated to making your travel booking experience seamless
              and enjoyable. With our extensive range of services, we aim to be
              your go-to travel partner.
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              Important Routes
            </h5>
            <p>
              Madurai to Hyderabad Flight | Mumbai to Srinagar Flight | Pune to
              Ranchi Flight | Raipur to Hyderabad Flight | Raipur to Mumbai
              Flight | Bhopal to Hyderabad Flight | Bhubaneshwar to Chennai
              Flight | Chennai to Nagpur Flight | Chennai to Port Blair Flight |
              Cochin to Chennai Flight | Delhi to Mangalore Flight | Hyderabad
              to Nagpur Flight | Jammu to Delhi Flight | Kolkata to Aizawl
              Flight | Lucknow to Hyderabad Flight | Udaipur to Delhi Flight |
              Agartala to Delhi Flight | Bangalore to Imphal Flight | Imphal to
              Guwahati Flight | Imphal to Kolkata Flight | Indore to Raipur
              Flight | Kozhikode to Chennai Flight | Mumbai to Imphal Flight
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              Trending Domestic Routes
            </h5>
            <p>
              Ahmedabad to Mumbai Flight | Bagdogra to Kolkata Flight |
              Bangalore to Udaipur Flight | Bhopal to Bangalore Flight |
              Bhubaneshwar to Mumbai Flight | Chandigarh to Chennai Flight |
              Chennai to Jaipur Flight | Delhi to Vadodara Flight | Goa to Pune
              Flight | Hyderabad to Coimbatore Flight | Hyderabad to Patna
              Flight | Jaipur to Bangalore Flight | Lucknow to Kolkata Flight |
              Mangalore to Bangalore Flight | Mumbai to Coimbatore Flight |
              Mumbai to Indore Flight | Mumbai to Rajkot Flight | Mumbai to
              Surat Flight | Mumbai to Vijaywada Flight | Pune to Chennai Flight
              | Bhubaneshwar to Kolkata Flight | Delhi to Kozhikode Flight |
              Mumbai to Jodhpur Flight | Ranchi to Mumbai Flight | Vadodara to
              Chennai Flight
            </p>
          </div>
          <div className="mb-8">
            <h5 className="text-lg font-bold mb-4 text-orange-500">
              New Udaan Sectors
            </h5>
            <p>
              Guwahati to Rupsi Flight | Rupsi to Kolkata Flight | Guwahati to
              Agartala Flight | Agartala to Dibrugarh Flight | Dibrugarh to
              Agartala Flight | Agartala to Guwahati Flight | Guwahati to
              Pasighat Flight | Pasighat to Shillong Flight | Shillong to
              Pasighat Flight | Pasighat to Guwahati Flight
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <img
              src="\public\images\2200326.png"
              alt="Logo"
              className="w-8 h-8 mr-2"
            />
            <div>
              <h2 className="text-lg font-bold">FlightGo!</h2>
              <p className="text-sm">© 2024 FlightGo!. All rights reserved.</p>
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
