import React from 'react'

const Review = () => {
  return (
    <div className='min-h-screen w-full bg-white flex flex-col justify-between py-12'>
        
        {/* Top Empty White Space */}
        <div className="w-full mb-8"></div>

        {/* Middle Section: Black background wrapping the Image and Form */}
        <div className='w-full bg-black flex flex-col md:flex-row shadow-2xl'>
            
            {/* Left Side: Image taking 30% width and 70% height with margin */}
            <div className='w-full md:w-[30%] flex items-center justify-center p-8 md:p-12'>
                <img 
                  src='https://imgmediagumlet.lbb.in/media/2024/12/675134a3fef45a07cdda55cb_1733375139964.jpg' 
                  className='w-full h-[60vh] md:h-[70vh] object-cover rounded-2xl shadow-lg shadow-black/50' 
                  alt='Review'
                />
            </div>

            {/* Right Side: Form spanning 70% of the width */}
            <div className='w-full md:w-[70%] p-8 md:p-16 lg:p-24 flex flex-col justify-center'>
                <h1 className="text-4xl md:text-5xl text-white font-bold mb-10">
                    Leave a Review
                </h1>
                
                <form className="flex flex-col gap-8 w-full max-w-4xl" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label className="text-gray-300 mb-2 font-medium text-lg">Name</label>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-gray-300 mb-2 font-medium text-lg">Email ID</label>
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Rating (Typed) */}
                  <div className="flex flex-col">
                    <label className="text-gray-300 mb-2 font-medium text-lg">Rating</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 5/5, Excellent, or 10/10" 
                      className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                    />
                  </div>

                  {/* Feedback */}
                  <div className="flex flex-col">
                    <label className="text-gray-300 mb-2 font-medium text-lg">Your Feedback</label>
                    <textarea 
                      rows="6"
                      placeholder="Share your experience with us..." 
                      className="bg-zinc-900 border border-zinc-800 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="mt-4 bg-blue-600 text-white font-bold py-4 px-12 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/30 text-lg self-start"
                  >
                    Submit Review
                  </button>
                </form>
            </div>
        </div>

        {/* Bottom Section: Footer Text in the white area */}
        <div className="w-full text-center mt-12 mb-4">
            <p className="text-gray-400 font-medium tracking-wide">
                Made by Sampurn Samadder
            </p>
        </div>
        
    </div>
  )
}

export default Review