import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: place.placeName };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
      className="relative group"
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
        {/* Card Image */}
        <div className="relative">
          <img
            src={photoUrl || '/placeholder 2.png'}
            alt={place.placeName}
            className="w-full h-40 object-cover"
          />
          {/* Best Time Badge */}
          <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {place.bestTimeToVisit}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
            {place.placeName}
          </h3>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-teal-700 font-medium">🕘 {place.timeToTravel}</p>
            
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
