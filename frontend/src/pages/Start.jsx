import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 sm:p-8">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl premium-shadow overflow-hidden flex flex-col md:flex-row h-[85vh] min-h-[600px]">
        
        {/* Left Section (Content) */}
        <div className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-16">Uber</h1>
            
            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-4">
              Go anywhere with Uber
            </h2>
            
            <p className="text-gray-600 text-lg mb-8">
              Request a ride, hop in, and go. Join millions of riders who trust us for their daily commute.
            </p>

            <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-4 px-8 rounded-xl font-medium transition-colors text-lg w-full sm:w-auto mt-4">
              <span>Get Started</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>

        {/* Right Section (Image/Illustration) */}
        <div className="w-full md:w-7/12 relative bg-accent h-64 md:h-auto overflow-hidden p-6 hidden md:block">
          <img 
            src="/images/uber_car.png" 
            alt="Uber premium car illustration" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Top Navigation Overlay */}
          <div className="relative z-10 flex justify-between items-center bg-black/10 backdrop-blur-sm rounded-full px-6 py-3 mt-4 mx-4">
            <div className="flex gap-6 text-white text-sm font-medium">
              <span className="cursor-pointer hover:opacity-80">Ride</span>
              <span className="cursor-pointer hover:opacity-80">Drive</span>
            </div>
            <div className="flex gap-6 items-center text-white text-sm font-medium">
              <Link to="/login" className="hover:opacity-80">Log In</Link>
              <Link to="/signup" className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">Sign Up</Link>
            </div>
          </div>

          {/* Bottom QR Code Card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-2 border border-gray-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-full h-full opacity-80" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">Download the Uber app</h3>
                <p className="text-gray-500 font-medium">Scan to download</p>
              </div>
            </div>
            <i className="ri-arrow-right-line text-2xl text-gray-400"></i>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Start