import React from 'react';
import HotelCardItem from './HotelCardItem'; // Correct default import

function Hotels({ trip }) {
  return (
    <div className="mt-10">
          <div className="relative">
      <h2 className="text-4xl font-extrabold text-gray-800">
        Hotel Recommendations
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Explore the best places to stay during your trip.
      </p>
      <div className="absolute w-16 h-1 bg-teal-500 rounded-full mt-4"></div>
    </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-8">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>

    </div>
  );
}

export default Hotels;
