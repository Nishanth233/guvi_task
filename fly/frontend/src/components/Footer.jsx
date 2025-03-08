import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="list-none">
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:underline">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="list-none">
              <li>
                <Link to="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="hover:underline">
                  Cancellation
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:underline">
                  Refund
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="list-none">
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:underline">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/cookie" className="hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/facebook.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/twitter.png"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/insta.jpg"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/linkendin.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2025 Flight Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
