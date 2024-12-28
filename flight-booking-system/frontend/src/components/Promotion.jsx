import React from "react";

const Promotion = ({ promotions }) => {
  return (
    <div className="p-4 border m-4 shadow-md">
      <h2 className="text-xl font-bold text-orange-600">Current Promotions</h2>
      {promotions.map((promo) => (
        <div key={promo.id} className="border p-2 m-2 bg-blue-100">
          <h3 className="text-lg">{promo.title}</h3>
          <p>{promo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Promotion;
