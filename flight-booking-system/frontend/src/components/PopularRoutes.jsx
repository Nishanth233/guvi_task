import React from "react";

const PopularRoutes = ({ routes }) => {
  return (
    <div className="p-4 border m-4 shadow-md bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">Popular Routes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map((route, index) => (
          <div key={route.id} className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <img
              src="\public\images\route.png" // Replace with actual image paths
              alt={route.route}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <p className="text-lg">{route.route}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
