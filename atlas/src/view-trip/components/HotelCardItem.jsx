import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = { textQuery: hotel?.hotelName };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.address}`}
      target="_blank"
      className="relative group"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
        {/* Hotel Image */}
        <div className="relative">
          <img
            src={photoUrl || '/placeholder 2.png'}
            alt={hotel?.hotelName}
            className="w-full h-48 object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          {/* Top Badge */}
          <div className="absolute top-4 left-4 bg-teal-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
            Featured
          </div>
        </div>
        {/* Hotel Details */}
        <div className="p-5 space-y-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
            {hotel?.hotelName}
          </h3>
          <p className="text-sm text-gray-500 truncate">📍 {hotel?.address}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-teal-700 font-medium">💰 {hotel?.price}</p>
            <p className="text-sm text-yellow-500 font-medium">⭐ {hotel?.rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
