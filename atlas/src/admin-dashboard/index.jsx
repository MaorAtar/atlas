import React, { useEffect, useState } from "react";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CheckCircle, Star } from "lucide-react";
import { CiExport } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { GetPlacePhotoUrlFromBackend } from "@/service/BackendApi";
import { FiAlertTriangle } from "react-icons/fi";
import { SignInButton, useUser } from "@clerk/clerk-react";

function AdminDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [recentTrips, setRecentTrips] = useState([]);
  const [tripsByMonth, setTripsByMonth] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [loadingActiveUsers, setLoadingActiveUsers] = useState(true);
  const [userError, setUserError] = useState(null);
  const [activeUserError, setActiveUserError] = useState(null);
  const [allTrips, setAllTrips] = useState([]);
  const [apiStatus, setApiStatus] = useState("Fetching...");
  const COLORS = ["#82e0aa", "#ec7063", "#f7dc6f", "#85c1e9"];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getUsers`
        );

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        setUserError(error.message);
      } finally {
        setLoadingUsers(false);
      }

      try {
        const activeResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getActiveUsers`
        );

        if (!activeResponse.ok) {
          throw new Error(
            `Error fetching active users: ${activeResponse.statusText}`
          );
        }
        const activeData = await activeResponse.json();
        setActiveUsersCount(activeData.count);
      } catch (error) {
        setActiveUserError(error.message);
      } finally {
        setLoadingActiveUsers(false);
      }

      const tripsSnapshot = await getDocs(collection(db, "AITrips"));
      setTotalTrips(tripsSnapshot.size);
      const tripsData = tripsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllTrips(tripsData);

      const tripsQuery = query(
        collection(db, "AITrips"),
        orderBy("createdAt", "desc")
      );
      const recentTripsData = (await getDocs(tripsQuery)).docs
        .map((doc) => doc.data())
        .slice(0, 5);
      setRecentTrips(recentTripsData);

      const monthCounts = {};
      tripsSnapshot.docs.forEach((doc) => {
        const date = new Date(doc.data().createdAt);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });
      setTripsByMonth(
        Object.keys(monthCounts).map((month) => ({
          month,
          count: monthCounts[month],
        }))
      );

      // Trip types count
      const tripTypeCounts = {};
      tripsData.forEach((trip) => {
        const type = trip.userSelection.traveler || "Other";
        tripTypeCounts[type] = (tripTypeCounts[type] || 0) + 1;
      });
      setTripTypes(
        Object.entries(tripTypeCounts).map(([name, value]) => ({ name, value }))
      );

      // Popular destinations count and photo URLs
      const destinationCounts = {};
      const destinationPhotoUrls = {};

      for (const trip of tripsData) {
        const destination = trip.userSelection.location.label || "Unknown";
        destinationCounts[destination] =
          (destinationCounts[destination] || 0) + 1;

        // Fetch photo URL if not already fetched
        if (!destinationPhotoUrls[destination]) {
          const data = { textQuery: destination };
          const result = await GetPlaceDetails(data);
          if (result.data.places?.[0]?.photos?.[0]?.name) {
            const photoRef = result.data.places?.[0]?.photos?.[0]?.name;
            destinationPhotoUrls[destination] =
              GetPlacePhotoUrlFromBackend(photoRef);
          }
        }
      }

      const sortedDestinations = Object.entries(destinationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      // Set popular destinations with photo URLs
      setPopularDestinations(
        sortedDestinations.map(([name, count]) => ({
          name,
          count,
          imageUrl: destinationPhotoUrls[name],
        }))
      );

      setApiStatus("Data fetched successfully");
    }
    fetchData();
  }, []);

  const handleExport = () => {
    const csvData = allTrips.map((trip) => ({
      userEmail: trip.userEmail,
      createdAt: new Date(trip.createdAt).toLocaleString(),
      destination: trip.userSelection.location.label,
      groupType: trip.userSelection.traveler,
    }));

    const csvContent = [
      "data:text/csv;charset=utf-8," +
        "User Email,Created At,Destination,Group Type\n" +
        csvData.map((e) => Object.values(e).join(",")).join("\n"),
    ].join("");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "trips_data.csv");
    document.body.appendChild(link);
    link.click();
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
    <div className="p-8">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
          Dashboard
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
        <div className="p-4 flex items-center justify-between bg-blue-300 text-white rounded-lg shadow-md">
          <img
            width={64}
            height={64}
            src="/admin-dashboard-icons/user.png"
            alt="step2"
          />
          <div>
            <p className="text-lg">Total Users</p>
            {loadingUsers ? (
              <h2 className="text-2xl font-bold">Loading...</h2>
            ) : userError ? (
              <h2 className="text-2xl font-bold text-red-500">{userError}</h2>
            ) : (
              <h2 className="text-2xl font-bold">{totalUsers}</h2>
            )}
          </div>
        </div>
        <div className="p-4 flex items-center justify-between bg-green-300 text-white rounded-lg shadow-md">
          <img
            width={64}
            height={64}
            src="/admin-dashboard-icons/world-map.png"
            alt="step2"
          />
          <div>
            <p className="text-lg">Total Trips</p>
            <h2 className="text-2xl font-bold">{totalTrips}</h2>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between bg-purple-300 text-white rounded-lg shadow-md">
          <img
            width={64}
            height={64}
            src="/admin-dashboard-icons/active.png"
            alt="step2"
          />
          <div>
            <p className="text-lg">Active Users (Last 30 Days)</p>
            {loadingActiveUsers ? (
              <h2 className="text-2xl font-bold">Loading...</h2>
            ) : activeUserError ? (
              <h2 className="text-2xl font-bold text-red-500">
                {activeUserError}
              </h2>
            ) : (
              <h2 className="text-2xl font-bold">{activeUsersCount}</h2>
            )}
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="flex flex-col items-center mb-12 mt-6 text-center">
        <h3 className="text-2xl md:text-xl font-extrabold text-gray-800 mb-3 text-center">
          API Status:{" "}
          {apiStatus === "Data fetched successfully" ? (
            <span className="text-green-600 flex items-center">
              <CheckCircle size={20} className="mr-1" /> {apiStatus}
            </span>
          ) : (
            apiStatus
          )}
        </h3>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 mt-8">
        {/* Trips Over Time Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2">
          <h3 className="text-2xl md:text-xl font-extrabold text-gray-800 mb-3 text-center">
            Trips Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tripsByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#73c6b6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trip Types Pie Chart */}
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2">
          <div className="w-full">
            <h3 className="text-2xl md:text-xl font-extrabold text-gray-800 mb-3 text-center">
              Trip Types Breakdown
            </h3>
            <ResponsiveContainer width="107%" height={300}>
              <PieChart>
                <Pie
                  data={tripTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                >
                  {tripTypes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full flex flex-col justify-center mt-6">
            <h4 className="text-lg font-bold mb-2">Trip Types:</h4>
            <ul>
              {tripTypes.map((entry, index) => {
                // Determine the label based on the string value
                let label;
                if (entry.name === "1") {
                  label = "Solo";
                } else if (entry.name === "2 People") {
                  label = "Couple";
                } else if (entry.name === "3 to 5 People") {
                  label = "Family";
                } else {
                  label = "Friends"; // For any other value (optional)
                }

                return (
                  <li key={index} className="flex items-center mb-1">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>
                      {label}: {entry.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl md:text-xl font-extrabold text-gray-800 mb-3 text-center">
          Popular Destinations
        </h3>
        <ul className="flex justify-center flex-wrap gap-4">
          {popularDestinations.map((dest, index) => (
            <li key={index} className="flex flex-col items-center text-sm w-60">
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="w-48 h-48 rounded-full object-cover mb-4"
              />
              <Star size={20} className="text-yellow-400 mb-1" />
              <span className="text-center">
                {dest.name} - {dest.count} trips
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Trips Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-2xl md:text-xl font-extrabold text-gray-800 mb-3 text-center">
          Recent Trips
        </h3>
        <table className="min-w-[600px] w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="border p-2">Created By</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Destination</th>
              <th className="border p-2">Group Type</th>
            </tr>
          </thead>
          <tbody>
            {recentTrips.map((trip, index) => (
              <tr key={index} className="border hover:bg-gray-100 text-center">
                <td className="border p-2">{trip.userEmail}</td>
                <td className="border p-2">
                  {new Date(trip.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {trip.userSelection.location.label}
                </td>
                <td className="border p-2">
                  {trip.userSelection.traveler || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Data Button */}
      <div className="mt-8 flex justify-center lg:justify-end">
        <Button
          onClick={handleExport}
          className="flex items-center bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2 rounded-full shadow-lg"
        >
          Export Trips Data
          <CiExport className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default AdminDashboard;
