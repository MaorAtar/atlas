import React from 'react';
import { TbPentagonNumber1, TbPentagonNumber2, TbPentagonNumber3 } from "react-icons/tb";

const HowItWorks = () => {
  return (
    <div className="py-16 bg-teal-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">How It Works</h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
            <div className="flex-1 text-center mb-4 md:mb-0">
              <TbPentagonNumber1 className="text-5xl text-teal-500 mb-4" />
              <p className="text-xl text-gray-600">
                Choose your destination, trip dates, and travel preferences to start planning
              </p>
            </div>

            <div className="flex-shrink-0 w-[500px] h-[500px]">
              <img
                src='/homepage-pictures/step1.png'
                alt='step1'
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
            <div className="flex-1 text-center mb-4 md:mb-0">
              <TbPentagonNumber2 className="text-5xl text-teal-500 mb-4" />
              <p className="text-xl text-gray-600">
                Based on your input, our AI-powered system generates a customized travel plan
              </p>
            </div>

            <div className="flex-shrink-0 w-[500px] h-[500px]">
              <img
                src='/homepage-pictures/step2.png'
                alt='step2'
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
            <div className="flex-1 text-center mb-4 md:mb-0">
              <TbPentagonNumber3 className="text-5xl text-teal-500 mb-4" />
              <p className="text-xl text-gray-600">
                Review your itinerary, and finalize your booking
              </p>
            </div>

            <div className="flex-shrink-0 w-[500px] h-[500px]">
              <img
                src='/homepage-pictures/step3.png'
                alt='step3'
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
