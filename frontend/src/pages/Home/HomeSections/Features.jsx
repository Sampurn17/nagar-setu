import React from 'react'

const Features = () => {
  return (
    <div className='relative'>
        <img
        src="https://images.unsplash.com/photo-1609338966656-926be552950d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-screen h-screen object-cover"
        alt="Features"
      />
        <div className="absolute inset-0 flex">
            <div className="w-1/3 h-3/4 mx-6 my-30 text-center backdrop-blur-sm bg-black/35 border border-white/20 rounded-3xl px-10 py-12 shadow-2xl">
            <h2 className="text-3xl font-bold mt-5 mb-5 text-white">
                Real-Time Tracking
                </h2>

                <p className="text-gray-200 leading-8 text-lg">
                Stay informed from submission to resolution with live status
                updates, progress tracking, and timely notifications at every
                stage of your complaint.
                </p>

                <div className="mt-8">
                <button className="text-white font-semibold border-b border-white/40 hover:border-white transition">
                    Track Complaint →
                </button>
            </div>
            </div>
            <div className="w-1/3 h-3/4 mx-6 my-30 text-center backdrop-blur-sm bg-black/35 border border-white/20 rounded-3xl px-10 py-12 shadow-2xl">
            <h2 className="text-3xl font-bold mt-5 mb-5 text-white">
                Smarter Communities
                </h2>

                <p className="text-gray-200 leading-8 text-lg">
                Every verified report helps local authorities improve public
                infrastructure, enhance city services, and create safer,
                cleaner neighborhoods for everyone.
                </p>

                <div className="mt-8">
                <button className="text-white font-semibold border-b border-white/40 hover:border-white transition">
                    Learn More →
                </button>
                </div>

            </div>
            <div className="w-1/3 h-3/4 mx-6 my-30 text-center backdrop-blur-sm bg-black/35 border border-white/20 rounded-3xl px-10 py-12 shadow-2xl">
            <h2 className="text-3xl font-bold mt-5 mb-5 text-white">
            Report Civic Issues
            </h2>

            <p className="text-gray-200 leading-8 text-lg">
            Quickly report potholes, overflowing garbage, damaged roads,
            faulty streetlights, water leaks, or sanitation concerns through
            a simple and intuitive complaint system.
            </p>

            <div className="mt-8">
            <button className="text-white font-semibold border-b border-white/40 hover:border-white transition">
            File a Complaint →
            </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Features