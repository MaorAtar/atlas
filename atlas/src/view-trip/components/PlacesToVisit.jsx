import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    if (!trip?.tripData?.itinerary) {
    return (
      <div className="mt-10 text-lg text-gray-600">No itinerary available for this trip.</div>
    );
  }
  
  return (
    <div className="mt-10">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Places to Visit</h2>

      <div className="space-y-10">
        {trip?.tripData?.itinerary.map((item, index) => {
          // Deduplicate weather conditions for the day
          const uniqueWeatherConditions = [
            ...new Set(item.attractions.map((place) => place.weatherConditions)),
          ].join(', ') || 'Weather not available';

          return (
            <div key={index} className="space-y-6">
              {/* Enhanced Day Header */}
              <div className="flex items-center gap-4 mb-6">
                {/* Day Badge */}
                <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-300 text-white font-bold text-lg rounded-lg shadow-lg">
                  Day {item.day}
                </div>
                {/* Gradient Line */}
                <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-500 to-teal-300"></div>
                {/* Display unique weather conditions for the day */}
                <div className="px-4 py-2 font-bold text-lg rounded-lg shadow-lg flex items-center gap-2 border-2 border-teal-300">
                  {(uniqueWeatherConditions === "Sunny" || uniqueWeatherConditions === "Clear" || uniqueWeatherConditions === "Clear Sky") && (
                    <div className="text-lg font-semibold text-white flex items-center gap-2">
                      <img src="/view-trip-icons/Sun.png" alt="Sunny Weather" className="w-12 h-12" />
                    </div>
                  ) || (uniqueWeatherConditions === "Cloudy" || uniqueWeatherConditions === "Partly cloudy") && (
                    <div className="text-lg font-semibold text-white flex items-center gap-2">
                      <img src="/view-trip-icons/Cloud.png" alt="Cloudy Weather" className="w-12 h-12" />
                    </div>
                  ) || (uniqueWeatherConditions === "Rainy" || uniqueWeatherConditions === "Cloud with rain") && (
                    <div className="text-lg font-semibold text-white flex items-center gap-2">
                      <img src="/view-trip-icons/Cloud with rain.png" alt="Rainy Weather" className="w-12 h-12" />
                    </div>
                  ) || uniqueWeatherConditions && (
                    <div className="text-lg font-semibold text-white flex items-center gap-2">
                      <img src="/view-trip-icons/Sun.png" alt="Weather" className="w-12 h-12" />
                    </div>
                  )}
                </div>
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
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
