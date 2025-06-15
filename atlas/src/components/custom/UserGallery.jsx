import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const UserGallery = () => {
  const users = [
    {
      id: 1,
      name: "Tal",
      destination: "Paris",
      image: "/homepage-pictures/user1.jpg",
    },
    {
      id: 2,
      name: "Dan",
      destination: "New York",
      image: "/homepage-pictures/user2.jpg",
    },
    {
      id: 3,
      name: "Avi & Ortal",
      destination: "Tokyo",
      image: "/homepage-pictures/user3.jpg",
    },
    {
      id: 4,
      name: "The Turgemans",
      destination: "Rome",
      image: "/homepage-pictures/user4.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? users.length - 1 : prevIndex - 1
    );
  };

  const currentUser = users[currentIndex];
  const previousUser = users[(currentIndex - 1 + users.length) % users.length];
  const nextUser = users[(currentIndex + 1) % users.length];

  return (
    <div className="relative flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Over 100 itineraries created
      </h2>

      <div className="relative w-full max-w-5xl flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-4 p-3 md:p-4 bg-white rounded-full text-3xl md:text-4xl hover:bg-gray-100 z-10"
        >
          <FaArrowCircleLeft />
        </button>

        {/* User Cards */}
        <div className="flex justify-center items-center space-x-3 md:space-x-6">
          {/* Hide prev/next cards on mobile */}
          <div className="hidden md:flex flex-col items-center text-center shadow-lg rounded-lg relative w-full max-w-md opacity-50">
            <img
              src={previousUser.image}
              alt={previousUser.name}
              className="w-full h-[250px] md:h-[350px] object-cover rounded-lg"
            />
            <div className="absolute p-3 md:p-4 bottom-3 left-3 text-white bg-black bg-opacity-50 rounded-lg">
              <h2 className="font-semibold">{previousUser.name} Visited</h2>
              <p className="text-sm md:text-lg flex items-center">
                <CiLocationOn className="mr-2" /> {previousUser.destination}
              </p>
            </div>
          </div>

          {/* Current User Card */}
          <div className="flex flex-col items-center text-center shadow-lg rounded-lg relative w-full max-w-md">
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-full h-[280px] md:h-[400px] object-cover rounded-lg"
            />
            <div className="absolute p-4 md:p-6 bottom-4 md:bottom-6 left-4 md:left-6 text-white bg-black bg-opacity-50 rounded-lg">
              <h3 className="text-lg md:text-2xl font-semibold">
                {currentUser.name} Visited
              </h3>
              <p className="text-sm md:text-lg flex items-center">
                <CiLocationOn className="mr-2" /> {currentUser.destination}
              </p>
            </div>
          </div>

          {/* Hide prev/next cards on mobile */}
          <div className="hidden md:flex flex-col items-center text-center shadow-lg rounded-lg relative w-full max-w-md opacity-50">
            <img
              src={nextUser.image}
              alt={nextUser.name}
              className="w-full h-[250px] md:h-[350px] object-cover rounded-lg"
            />
            <div className="absolute p-3 md:p-4 bottom-3 left-3 text-white bg-black bg-opacity-50 rounded-lg">
              <h2 className="font-semibold">{nextUser.name} Visited</h2>
              <p className="text-sm md:text-lg flex items-center">
                <CiLocationOn className="mr-2" /> {nextUser.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-4 p-3 md:p-4 bg-white rounded-full text-3xl md:text-4xl hover:bg-gray-100"
        >
          <FaArrowCircleRight />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex mt-4 md:mt-6 space-x-2">
        {users.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default UserGallery;
