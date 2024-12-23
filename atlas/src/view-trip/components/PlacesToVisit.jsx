import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Places to Visit</h2>

      <div className="space-y-10">
        {trip?.tripData?.itinerary.map((item, index) => (

        <div key={index} className="space-y-6">
                {/* Enhanced Day Header */}
            <div className="flex items-center gap-4 mb-6">
                {/* Day Badge */}
                <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-300 text-white font-bold text-lg rounded-lg shadow-lg">
                    Day {item.day}
                </div>
                {/* Gradient Line */}
                <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-500 to-teal-300"></div>
                
            </div>


            {/* Attraction Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {item.attractions.map((place, idx) => (
                <div key={idx} className="space-y-3">
                  {/* Attraction Card */}
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
