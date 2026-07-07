import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className="relative">
      
      <img
        src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-screen h-screen object-cover"
        alt="Hero"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-2xl mx-6 text-center backdrop-blur-md bg-black border border-white/20 rounded-3xl px-10 py-12 shadow-2xl">
          <h1 className="text-5xl md:text-6xl text-white font-extrabold leading-tight mb-5">
            Your Voice.
            <br />
            Our Responsibility.
          </h1>

          <p className="text-lg text-gray-200 leading-8 max-w-xl mx-auto mb-8">
            Report issues like potholes, garbage collection, water leakage,
            streetlights, sanitation, and other civic problems directly to your
            municipality.
          </p>

          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105">
              File a Complaint
            </button>
          </Link>

  </div>
</div>
      
    </div>
  );
};

export default Hero;