import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4 flex justify-between items-center">
    <h1 className="text-white text-2xl">Movies Search App</h1>
    <div className="text-white">
      <Link to="/" className="mr-4">
        Home
      </Link>
    </div>
  </nav>
);

export default Navbar;
