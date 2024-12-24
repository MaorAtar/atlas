import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/homepage-pictures/homepage-bg.jpg')",
        height: '75vh',
        color: '#fff',
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
        <h1 className="font-extrabold text-5xl max-w-4xl">
          <span className="text-teal-400">Simplify Travel Planning</span>  
          <br /> Tailored Itineraries Powered by AI
        </h1>
        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          Your personalized trip planner that creates amazing itineraries, all based on your preferences, time, and budget.
        </p>
        <Link to="/create-trip">
          <Button className="mt-8 bg-teal-500 hover:bg-teal-700">
            Start Planning
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
