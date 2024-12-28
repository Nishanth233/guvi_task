import React from "react";

const FlightTypesSlide = () => {
  const flightTypes = [
    {
      id: 1,
      type: "Economy Class",
      description: "Affordable and comfortable travel for budget-conscious passengers.",
      image: "/public/images/eco.jpg",
    },
    {
      id: 2,
      type: "Business Class",
      description: "Enhanced comfort and services for business travelers.",
      image: "/public/images/bus.jpg",
    },
    {
      id: 3,
      type: "First Class",
      description: "Luxurious and premium travel experience with top-notch amenities.",
      image: "/public/images/first.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white shadow-md mb-8">
      {flightTypes.map((flight) => (
        <div key={flight.id} className="bg-gray-100 p-4 rounded-lg">
          <img
            src={flight.image}
            alt={flight.type}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-bold mb-2">{flight.type}</h3>
          <p>{flight.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightTypesSlide;
