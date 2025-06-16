import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import UserTripCardItem from "@/my-trips/components/UserTripCardItem";
import { FiAlertTriangle, FiSearch, FiTrash } from "react-icons/fi";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

function AdminAllTrips() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [allTrips, setAllTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    fetchAllTrips();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allTrips.filter((trip) =>
      trip?.userSelection?.location?.label
        ?.toLowerCase()
        .includes(lowerCaseQuery)
    );
    setFilteredTrips(filtered);
  }, [searchQuery, allTrips]);

  const fetchAllTrips = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "AITrips"));
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setAllTrips(allTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-6">
        <div className="text-red-500 mb-4">
          <FiAlertTriangle className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          You do not have permission to view this page. If you believe this is a
          mistake, please contact the administrator or sign in with an admin
          account.
        </p>
        <div className="flex gap-4">
          <a href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-md">
              Go to Home
            </Button>
          </a>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-md">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-10 md:px-20 xl:px-56 mt-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
          All Trips
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div key={trip.id} className="relative">
              <UserTripCardItem trip={trip} />
              <button
                onClick={() => deleteTrip(trip.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600"
              >
                <FiTrash className="h-5 w-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-sm sm:text-base">
            No trips available.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAllTrips;
