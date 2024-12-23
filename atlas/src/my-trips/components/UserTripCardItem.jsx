import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
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
    <Link
      to={`/view-trip/${trip?.id}`}
      className="block group relative rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-[250px] overflow-hidden rounded-t-xl">
        <img
          src={photoUrl ? photoUrl : '/placeholder 2.png'}
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 bg-white rounded-b-xl">
        <h2 className="text-lg font-extrabold text-gray-800 group-hover:text-teal-500 transition-colors duration-300">
          {trip?.userSelection?.location?.label}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {trip?.userSelection?.numOfDays} days trip with a {trip?.userSelection?.budget} budget
        </p>
        {/* Badge Section */}
        <div className="mt-3 flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-100 rounded-full">
            {trip?.userSelection?.numOfDays} Days
          </span>
          <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
            {trip?.userSelection?.budget} Budget
          </span>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
