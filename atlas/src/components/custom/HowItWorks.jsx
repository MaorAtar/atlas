import React from "react";
import {
  TbPentagonNumber1,
  TbPentagonNumber2,
  TbPentagonNumber3,
} from "react-icons/tb";

const HowItWorks = () => {
  return (
    <div className="py-14 bg-teal-50">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">How It Works</h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col-reverse md:flex-row items-center p-6 bg-white shadow-lg rounded-lg">
            <div className="flex-1 text-center mt-6 md:mt-0 md:pr-6">
              <TbPentagonNumber1 className="text-4xl md:text-5xl text-teal-500 mb-4 mx-auto" />
              <p className="text-lg md:text-xl text-gray-600">
                Choose your destination, trip dates, and travel preferences to
                start planning
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-[500px] h-[280px] md:h-[500px]">
              <img
                src="/homepage-pictures/step1.png"
                alt="step1"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center p-6 bg-white shadow-lg rounded-lg">
            <div className="flex-1 text-center mt-6 md:mt-0 md:pr-6">
              <TbPentagonNumber2 className="text-4xl md:text-5xl text-teal-500 mb-4 mx-auto" />
              <p className="text-lg md:text-xl text-gray-600">
                Based on your input, our AI-powered system generates a
                customized travel plan
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-[500px] h-[280px] md:h-[500px]">
              <img
                src="/homepage-pictures/step2.png"
                alt="step2"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col-reverse md:flex-row items-center p-6 bg-white shadow-lg rounded-lg">
            <div className="flex-1 text-center mt-6 md:mt-0 md:pr-6">
              <TbPentagonNumber3 className="text-4xl md:text-5xl text-teal-500 mb-4 mx-auto" />
              <p className="text-lg md:text-xl text-gray-600">
                Review your itinerary, and finalize your booking
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-[500px] h-[280px] md:h-[500px]">
              <img
                src="/homepage-pictures/step3.png"
                alt="step3"
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
