import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";
import { FiSearch } from "react-icons/fi";

function MyTrips() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserTrips();
    }
  }, [user]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = userTrips.filter((trip) =>
      trip?.userSelection?.location?.label
        ?.toLowerCase()
        .includes(lowerCaseQuery)
    );
    setFilteredTrips(filtered);
  }, [searchQuery, userTrips]);

  const GetUserTrips = async () => {
    if (!user) {
      navigate("/");
      return;
    }

    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      console.error("User email is not available");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);
      setUserTrips([]);
      querySnapshot.forEach((doc) => {
        setUserTrips((prevVal) => [...prevVal, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56 mt-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
          My Trips
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>

        {/* Search Bar */}
        <div className="w-full mt-6 flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by location..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-300 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-5">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <UserTripCardItem trip={trip} key={index} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No trips match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
