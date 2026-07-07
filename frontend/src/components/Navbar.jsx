import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 flex items-center px-8">
      
      {/* Left */}
      <div className="flex-1"></div>

      {/* Center */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-3xl font-bold">NAGARSETU</h1>
      </div>

      {/* Right */}
      <div className="flex-1 flex justify-end gap-4">
        <Link to="/login">
          <button className="px-4 py-2 border bg-blue-600 rounded">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-4 py-2 border-black bg-blue-800 text-white rounded">
            Register
          </button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;