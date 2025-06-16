import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { generateTravelPlan } from "@/service/AIModel";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import CustomLoader from "@/components/custom/CustomLoader";
import { FiAlertTriangle } from "react-icons/fi";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    numOfDays: "",
    budget: "",
    traveler: "",
    location: null,
  });
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    if (!formData.location) {
      toast.error("Destination is required.", {
        style: {
          backgroundColor: "#FF4136",
          color: "#1A1A1A",
        },
      });
      return false;
    }
    if (
      !formData.numOfDays ||
      formData.numOfDays <= 0 ||
      formData.numOfDays > 10
    ) {
      toast.error("Please enter a valid number of nights (1-10).", {
        style: {
          backgroundColor: "#FF4136",
          color: "#1A1A1A",
        },
      });
      return false;
    }
    if (!formData.budget) {
      toast.error("Please select a budget.", {
        style: {
          backgroundColor: "#FF4136",
          color: "#1A1A1A",
        },
      });
      return false;
    }
    if (!formData.traveler) {
      toast.error("Please select the number of travelers.", {
        style: {
          backgroundColor: "#FF4136",
          color: "#1A1A1A",
        },
      });
      return false;
    }
    return true;
  };

  const OnGenerateTrip = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.numOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.numOfDays);

    try {
      const result = await generateTravelPlan(FINAL_PROMPT);
      console.log(result);
      saveAiTrip(result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  const saveAiTrip = async (TripData) => {
    try {
      setLoading(true);

      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.emailAddresses[0]?.emailAddress || "Unknown",
        id: docId,
        createdAt: new Date().toISOString(),
      });

      toast.success("Trip saved successfully!", {
        style: {
          backgroundColor: "#28a745",
          color: "#fff",
        },
      });

      router(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip data:", error);

      toast.error("Failed to save trip data. Please try again.", {
        style: {
          backgroundColor: "#FF4136",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
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
          mistake, please contact the administrator or sign in.
        </p>
        <div className="flex gap-4">
          <a href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-md">
              Go to Home
            </Button>
          </a>
          <SignInButton mode="modal">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-md">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen mb-10">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <div className="relative">
          <img
            className="rounded-xl w-full h-64 object-cover"
            src="/create-trip-pictures/create-trip-bg.jpg"
            alt="create-trip"
          />
          <h1 className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white text-xl font-semibold px-4 py-2 rounded-md">
            Plan Your Dream Trip
          </h1>
        </div>
        <h1 className="text-2xl font-bold text-center mt-6">
          Tell us your travel preferences
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Provide some basic information, and Atlas will generate a customized
          itinerary based on your preferences.
        </p>
        <div>
          <div className="mt-5 flex flex-col">
            <h2 className="text-xl my-3 font-medium">Destination of choice:</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                styles: {
                  control: (base) => ({
                    ...base,
                    width: "100%",
                    maxWidth: "400px",
                  }),
                  menu: (base) => ({
                    ...base,
                    width: "100%",
                    maxWidth: "400px",
                  }),
                },
              }}
            />
            <div>
              <h2 className="text-xl my-3 font-medium">Number of nights:</h2>
              <Input
                placeholder="Ex.3"
                type="number"
                value={formData.numOfDays}
                onChange={(e) => handleInputChange("numOfDays", e.target.value)}
                className="w-full max-w-sm"
                min={1}
                max={10}
              />
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-xl my-3 font-medium">Trip Budget:</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${
                          formData?.budget === item.title &&
                          "shadow-lg border-black"
                        }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl my-3 font-medium">Trip Structure:</h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                            ${
                              formData?.traveler === item.people &&
                              "shadow-lg border-black"
                            }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <Button onClick={OnGenerateTrip}>
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
        <CustomLoader isLoading={loading} />
      </div>
    </div>
  );
};

export default CreateTrip;
