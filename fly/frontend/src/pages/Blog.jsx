import React from "react";
import Footer from "../components/Footer";

const Blog = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the Flight Booking Blog! Here, you'll find the latest travel
        tips, destination guides, and industry news to help you make the most of
        your journeys.
      </p>
      <p className="text-gray-700 mb-4">
        Our blog covers a wide range of topics to inspire and inform you,
        including:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Top travel destinations and hidden gems</li>
        <li>Travel tips and packing hacks</li>
        <li>Industry news and updates</li>
        <li>Personal travel stories and experiences</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Stay tuned for regular updates and feel free to share your thoughts and
        experiences with us. Happy travels!
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
