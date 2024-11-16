import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => (
  <nav className="bg-gray-800 p-4 flex justify-between items-center">
    <h1 className="text-white text-2xl">Store</h1>
    <div className="text-white">
      <Link to="/cart" className="relative">
        Cart ({cartCount})
      </Link>
    </div>
  </nav>
);

export default Navbar;
