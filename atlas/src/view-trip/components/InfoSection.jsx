import React, { useEffect, useState } from 'react';
import { GetPlaceDetailsFromBackend, GetPlacePhotoUrlFromBackend } from '@/service/BackendApi';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);


const GetPlacePhoto = async () => {
  try {
    const textQuery = trip?.userSelection?.location?.label;

    if (!textQuery) {
      console.warn('No location label provided for the place photo request.');
      return;
    }

    const data = { textQuery };
    const resp = await GetPlaceDetailsFromBackend(data);

    if (resp.places && resp.places.length > 0 && resp.places[0].photos)
 {
      const photoRef = resp.places[0].photos[0].name;
      
      setPhotoUrl(GetPlacePhotoUrlFromBackend(photoRef));
    } else {
      console.warn('No photo found for this place');
    }
  } catch (err) {
    console.error(err);
  }
};




  return (
    <div className="space-y-6">
      {/* Image Section */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={photoUrl || '/placeholder 2.png'}
          alt="Travel"
          className="h-[450px] w-full object-cover"
        />
        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-br from-teal-500 to-teal-700 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
          Explore {trip?.userSelection?.location?.label}
        </div>
      </div>

      {/* Trip Details */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800">
            {trip?.userSelection?.location?.label}
            
          </h2>
          <div className="mt-3 flex gap-4">
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600">
              📅 {trip.userSelection?.numOfDays} Days
            </span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600">
              💰 {trip.userSelection?.budget} Budget
            </span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600">
              👥 {trip.userSelection?.traveler}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
