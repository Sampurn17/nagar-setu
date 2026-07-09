import React from 'react'
import { Link } from 'react-router-dom'

const Connect = () => {
  const checkpoints = [
    "Live Complaint Tracking",
    "Location Based Reporting",
    "Department Wise Management",
    "Transparent Resolution Process",
  ];

  return (
    <section className="w-full bg-blue-100 py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Left — Image */}
        <div className="w-full md:w-1/2 animate-fade-in">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXjvMAoOZRYrkcdUFLMpMpiGRhL99O29eDHdynlc4wCclp9UiCr2m0IPie&s=10"
            alt="Citizens connecting with authorities"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* Right — Content */}
        <div className="w-full md:w-1/2 animate-fade-in-delay-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
            Connecting Citizens with Local Authorities
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            NagarSetu enables citizens to report civic issues with precise locations,
            supporting images and detailed descriptions. Municipal departments receive
            organized reports, allowing faster action and greater transparency.
          </p>

          {/* Feature Checkpoints */}
          <div className="space-y-3.5 mb-10">
            {checkpoints.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>

          <Link to="/login">
            <button className="px-7 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm">
              Explore Dashboard
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Connect
