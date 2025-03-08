import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Flight Booking, your one-stop solution for all your travel
        needs. Our mission is to provide seamless and hassle-free flight booking
        experiences for travelers around the world.
      </p>
      <p className="text-gray-700 mb-4">
        Founded in 2025, Flight Booking has grown rapidly by offering
        exceptional customer service, unbeatable prices, and a user-friendly
        platform. Our dedicated team works tirelessly to ensure you have the
        best travel experience possible. We are committed to innovation and
        constantly improving our services to meet the evolving needs of our
        customers.
      </p>
      <p className="text-gray-700 mb-4">Our core values include:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          Customer Satisfaction: We strive to exceed customer expectations at
          every touchpoint.
        </li>
        <li>
          Integrity: We conduct our business with the highest level of honesty
          and transparency.
        </li>
        <li>
          Innovation: We embrace new technologies and ideas to enhance our
          services.
        </li>
        <li>Excellence: We are committed to excellence in everything we do.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Thank you for choosing Flight Booking. We look forward to serving you
        and making your travel dreams a reality.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
