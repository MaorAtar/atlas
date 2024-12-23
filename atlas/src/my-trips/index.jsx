import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserTrips();
    }
  }, [user]);

  const GetUserTrips = async () => {
    if (!user) {
      navigate('/');
      return;
    }

    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      console.error('User email is not available');
      return;
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);
      setUserTrips([]);
      querySnapshot.forEach((doc) => {
        setUserTrips((prevVal) => [...prevVal, doc.data()]);
      });
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  return (
    <div className="mr-20 ml-20 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
          My Trips
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {userTrips?.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCardItem trip={trip} key={index} />
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[400px] w-full bg-slate-200 animate-pulse rounded-xl"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyTrips;
