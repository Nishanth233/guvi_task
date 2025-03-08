import React from "react";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Have a question or need support? Reach out to our friendly customer
        support team. We are here to assist you with any inquiries or issues you
        may have.
      </p>
      <p className="text-gray-700 mb-4">Contact Information:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <strong>Email:</strong> support@flightbooking.com
        </li>
        <li>
          <strong>Phone:</strong> 1-800-123-4567
        </li>
      </ul>
      <p className="text-gray-700 mb-4">
        Our customer support team is available Monday to Friday from 9 AM to 6
        PM. We look forward to hearing from you!
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
