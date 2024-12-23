import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';

const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: trip?.userSelection?.location?.label };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    });
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
        <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2 rounded-full shadow-lg">
          Share
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
