import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 flex items-center px-10">
      
      {/* Left */}
      <div className="flex-1"></div>

      {/* Center */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">NAGARSETU</h1>
      </div>

      {/* Right */}
      <div className="flex-1 flex justify-end gap-3">
        <Link to="/login">
          <button className="px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200 cursor-pointer">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
            Register
          </button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;