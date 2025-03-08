import React from "react";
import Footer from "../components/Footer";

const Careers = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Careers</h1>
      <p className="text-gray-700 mb-4">
        At Flight Booking, we believe in fostering a dynamic and inclusive work
        environment. Join us and be a part of a team that values innovation,
        collaboration, and growth.
      </p>
      <p className="text-gray-700 mb-4">
        We offer exciting career opportunities in various fields, including
        technology, customer service, marketing, and operations. Our team
        members enjoy competitive salaries, comprehensive benefits, and ample
        opportunities for professional development.
      </p>
      <p className="text-gray-700 mb-4">
        Some of the benefits of working with us include:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Health and wellness programs</li>
        <li>Flexible work hours</li>
        <li>Continuous learning and development</li>
        <li>Collaborative work environment</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Interested in joining our team? Check out our current job openings and
        apply today! For inquiries, please email careers@flightbooking.com.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
