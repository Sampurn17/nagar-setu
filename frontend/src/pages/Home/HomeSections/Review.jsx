import React from 'react'

const steps = [
  { number: "01", label: "Report" },
  { number: "02", label: "Department Assignment" },
  { number: "03", label: "Issue Resolution" },
  { number: "04", label: "Citizen Notification" },
];

const Review = () => {
  return (
    <>
      {/* How It Works Section */}
      <section className="w-full bg-gray-950 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 animate-fade-in">
            How NagarSetu Works
          </h2>

          {/* Timeline */}
          <div className="flex flex-col md:flex-row items-center justify-center animate-fade-in-delay-1">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                {/* Node */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                  <p className="text-sm font-semibold text-white mt-4">{step.label}</p>
                </div>
                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-24 lg:w-32 h-[2px] bg-gradient-to-r from-blue-500/60 to-blue-500/20 mx-1 -mt-6"></div>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-white/50 mt-16 animate-fade-in-delay-2">
            Making civic reporting transparent, efficient and accountable.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-950 border-t border-white/10 py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-extrabold tracking-tight text-white mb-3">NAGARSETU</h3>
          <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-8">
            Empowering citizens to build cleaner, smarter and more responsive cities.
          </p>
          <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-1">
            <p className="text-xs text-white/35">© 2026 NagarSetu</p>
            <p className="text-xs text-white/35">Made by Sampurn Samadder</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Review