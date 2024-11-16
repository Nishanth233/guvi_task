import React from "react";

const Navbar = ({ cartCount, onCartClick }) => (
  <nav className="bg-gray-800 p-4 flex justify-between items-center">
    <h1 className="text-white text-2xl">Store</h1>
    <div className="text-white">
      <button onClick={onCartClick} className="relative">
        Cart ({cartCount})
      </button>
    </div>
  </nav>
);

export default Navbar;