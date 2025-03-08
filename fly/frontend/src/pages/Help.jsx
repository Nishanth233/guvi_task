import React from "react";
import Footer from "../components/Footer";

const Help = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the Flight Booking Help Center. Here, you'll find answers to
        frequently asked questions, troubleshooting guides, and support
        resources.
      </p>
      <p className="text-gray-700 mb-4">Frequently Asked Questions:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>How do I change or cancel my booking?</li>
        <li>What is your refund policy?</li>
        <li>How can I contact customer support?</li>
        <li>What payment methods do you accept?</li>
      </ul>
      <p className="text-gray-700 mb-4">
        If you need further assistance, please reach out to our customer support
        team at support@flightbooking.com or call 1-800-123-4567.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
