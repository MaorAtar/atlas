import React from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { TbPackageExport } from "react-icons/tb";
import { FaHotel } from "react-icons/fa6";

function WhatsIncluded() {
  return (
    <div className="max-w-7xl mx-auto text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 mt-10">
        What's Included
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-8 md:space-y-0">
        {/* Restaurant & Attractions */}
        <div className="flex flex-col items-center max-w-xs">
          <div className="p-4 rounded-full bg-teal-100 mb-4">
            <IoRestaurantOutline className="text-4xl md:text-4xl text-teal-500" />
          </div>
          <h3 className="font-semibold text-lg md:text-xl">
            Restaurants & Attractions
          </h3>
          <p className="text-gray-600">
            Relevant recommendations for every day
          </p>
        </div>

        {/* Curated Hotels */}
        <div className="flex flex-col items-center max-w-xs">
          <div className="p-4 rounded-full bg-teal-100 mb-4">
            <FaHotel className="text-4xl md:text-4xl text-teal-500" />
          </div>
          <h3 className="font-semibold text-lg md:text-xl">Curated Hotels</h3>
          <p className="text-gray-600">Discover the best hotels for you</p>
        </div>

        {/* Offline Access */}
        <div className="flex flex-col items-center max-w-xs">
          <div className="p-4 rounded-full bg-teal-100 mb-4">
            <TbPackageExport className="text-4xl md:text-4xl text-teal-500" />
          </div>
          <h3 className="font-semibold text-lg md:text-xl">Offline Access</h3>
          <p className="text-gray-600">Export your itinerary</p>
        </div>
      </div>
    </div>
  );
}

export default WhatsIncluded;
