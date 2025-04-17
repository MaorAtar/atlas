import React from 'react';
import { IoRestaurantOutline } from "react-icons/io5";
import { TbPackageExport } from "react-icons/tb";
import { FaHotel } from "react-icons/fa6";

function WhatsIncluded() {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-10 mt-10">What's Included</h2>

      <div className="flex justify-center space-x-12">
        {/* Restaurant & Attractions */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full bg-teal-100 mb-4">
            <IoRestaurantOutline className="text-4xl text-teal-500" />
          </div>
          <h3 className="font-semibold">Restaurants & Attractions</h3>
          <p>Relevant recommendations for every day</p>
        </div>

        {/* Curated Hotels */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full bg-teal-100 mb-4">
            <FaHotel className="text-4xl text-teal-500" />
          </div>
          <h3 className="font-semibold">Curated Hotels</h3>
          <p>Discover the best hotels for you</p>
        </div>

        {/* Offline Access */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 rounded-full bg-teal-100 mb-4">
            <TbPackageExport className="text-4xl text-teal-500" />
          </div>
          <h3 className="font-semibold">Offline Access</h3>
          <p>Export your itinerary</p>
        </div>
      </div>
    </div>
  );
}

export default WhatsIncluded;
