import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetailsFromBackend, GetPlacePhotoUrlFromBackend } from '@/service/BackendApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && fetchPlacePhoto();
  }, [place]);

  const fetchPlacePhoto = async () => {
    try {
      const data = { textQuery: place.placeName };
      const resp = await GetPlaceDetailsFromBackend(data);

      if (resp.places?.[0]?.photos?.[0]?.name) {
        const photoRef = resp.places[0].photos[0].name;
        setPhotoUrl(GetPlacePhotoUrlFromBackend(photoRef));
      }
    } catch (err) {
      console.error('Error fetching place photo:', err);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
      className="relative group"
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
        <div className="relative">
          <img
            src={photoUrl || '/placeholder 2.png'}
            alt={place.placeName}
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {place.bestTimeToVisit}
          </div>
        </div>
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
