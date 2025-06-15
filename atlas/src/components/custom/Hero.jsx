import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Hero() {
  const { user } = useUser();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) {
      const userRole = user.publicMetadata?.role; // Use optional chaining to avoid errors

      if (userRole === "admin" && !sessionStorage.getItem("adminToastShown")) {
        setShowToast(true);
        sessionStorage.setItem("adminToastShown", "true"); // Mark as shown

        setTimeout(() => {
          setShowToast(false);
        }, 4000); // Auto-dismiss after 4 seconds
      }
    }
  }, [user]);

  return (
    <div
      className="relative bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/homepage-pictures/homepage-bg.jpg')",
        height: "75vh",
        color: "#fff",
      }}
    >
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 backdrop-blur-md p-3 text-white px-5 py-2 rounded-lg text-base md:text-lg font-semibold shadow-lg animate-slideIn z-50">
          Welcome, Admin! 😃
        </div>
      )}

      <div className="bg-black bg-opacity-50 p-5 md:p-6 rounded-lg text-center max-w-lg md:max-w-3xl">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
          <span className="text-teal-400">Simplify Travel Planning</span>
          <br /> Tailored Itineraries Powered by AI
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-200">
          Your personalized trip planner that creates amazing itineraries, all
          based on your preferences, time, and budget.
        </p>
        <Link to="/create-trip">
          <Button className="mt-6 md:mt-8 bg-teal-500 hover:bg-teal-700 transition-all duration-300 text-sm md:text-base">
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
