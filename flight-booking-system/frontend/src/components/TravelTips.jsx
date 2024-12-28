import React from "react";

const TravelTips = ({ tips }) => {
  const icons = [
    "/public/images/suit.png",  // Replace these with actual image paths
    "/public/images/pass.png",
    "/public/images/air.png",
  ];

  return (
    <div className="p-4 border m-4 shadow-md bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">Travel Tips</h2>
      {tips.map((tip, index) => {
        const icon = icons[index % icons.length]; // Cycle through icons
        return (
          <div
            key={tip.id}
            className="flex items-center border p-4 mb-4 bg-white rounded-lg shadow-lg"
          >
            <img src={icon} alt={`icon-${index}`} className="w-10 h-10 mr-4" />
            <p className="text-lg">{tip.tip}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TravelTips;

