import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 w-full h-full object-cover"
        alt="India Gate"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/58"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl animate-fade-in">


          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
            Welcome to
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-400 leading-tight mb-5">
            NagarSetu
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-4">
            Your Voice. Our Responsibility.
          </p>

          {/* Description */}
          <p className="text-base text-white/65 leading-relaxed max-w-2xl mx-auto mb-10">
            Report civic issues such as potholes, garbage collection, damaged roads,
            streetlights and water leakages directly to your municipality and track
            every complaint from submission to resolution.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <Link to="/login">
              <button className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/25">
                Report a Complaint
              </button>
            </Link>
            <a href="#features">
              <button className="px-8 py-3.5 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
            </a>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Hero;