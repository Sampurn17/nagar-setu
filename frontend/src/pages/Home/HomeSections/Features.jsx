import React from 'react'
import { Activity, MapPin, Users } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Tracking",
      description: "Stay updated as your complaint progresses through every stage.",
      link: "Track Now →"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Report Civic Issues",
      description: "Quickly report municipal issues with accurate location and image support.",
      link: "Report Now →"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Community Impact",
      description: "Every complaint contributes to building a cleaner and smarter city.",
      link: "Learn More →"
    }
  ];

  return (
    <div id="features" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1609338966656-926be552950d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Features"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center mb-14 animate-fade-in">
          
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Built for Citizens, Designed for Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border border-slate-200 p-8 shadow-sm transition-transform duration-200 animate-fade-in-delay-${i + 1}`}
            >
              <div className="mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{feature.description}</p>
              <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-200">
                {feature.link}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features