import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Hero() {
  const { user } = useUser();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) {
      const userRole = user.publicMetadata?.role; // Use optional chaining to avoid errors

      if (userRole === 'admin' && !sessionStorage.getItem('adminToastShown')) {
        setShowToast(true);
        sessionStorage.setItem('adminToastShown', 'true'); // Mark as shown

        setTimeout(() => {
          setShowToast(false);
        }, 4000); // Auto-dismiss after 4 seconds
      }
    }
  }, [user]);

  return (
    <div
      className="relative bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/homepage-pictures/homepage-bg.jpg')",
        height: '75vh',
        color: '#fff',
      }}
    >
      {showToast && (
        <div className="fixed top-5 center-5 bg-black bg-opacity-70 backdrop-blur-md p-4 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-lg animate-slideIn">
          Welcome, Admin! 😃
        </div>
      )}

      <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
        <h1 className="font-extrabold text-5xl max-w-4xl">
          <span className="text-teal-400">Simplify Travel Planning</span>  
          <br /> Tailored Itineraries Powered by AI
        </h1>
        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          Your personalized trip planner that creates amazing itineraries, all based on your preferences, time, and budget.
        </p>
        <Link to="/create-trip">
          <Button className="mt-8 bg-teal-500 hover:bg-teal-700 transition-all duration-300">
            Start Planning
          </Button>
        </Link>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slideIn {
            animation: slideIn 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default Hero;
