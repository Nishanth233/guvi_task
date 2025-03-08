import React from "react";
import Footer from "../components/Footer";

const Press = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Press</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the Flight Booking Press Room. Here, you'll find our latest
        press releases, media contacts, and company news.
      </p>
      <p className="text-gray-700 mb-4">
        For media inquiries or interview requests, please reach out to our press
        team at press@flightbooking.com.
      </p>
      <p className="text-gray-700 mb-4">Recent Press Releases:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Launch of our new mobile app - January 2025</li>
        <li>Partnership with XYZ Airlines - December 2024</li>
        <li>Expansion into new markets - November 2024</li>
      </ul>
      <p className="text-gray-700">
        Thank you for your interest in Flight Booking!
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Press;
