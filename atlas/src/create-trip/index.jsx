import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { generateTravelPlan } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const { user } = useUser();
    const router = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const OnGenerateTrip = async () => {
        if (formData?.numOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast.error('Please fill all details', {
                style: {
                    backgroundColor: '#FF4136',
                    color: '#1A1A1A'
                }
            });
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.numOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.numOfDays);

        console.log(FINAL_PROMPT);

        try {
            const result = await generateTravelPlan(FINAL_PROMPT);
            console.log(result);
            saveAiTrip(result);
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate trip');
        } finally {
            setLoading(false);
        }
    };

    const saveAiTrip = async (TripData) => {
        try {
            setLoading(true);
    
            // Generate a unique document ID
            const docId = Date.now().toString();
    
            // Insert the trip data into Firestore under the "AITrips" collection
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: TripData,
                userEmail: user?.emailAddresses[0]?.emailAddress || "Unknown", // Use user's email address
                id: docId,
                createdAt: new Date().toISOString(), // Add timestamp for reference
            });
    
            toast.success("Trip saved successfully!", {
                style: {
                    backgroundColor: "#28a745",
                    color: "#fff",
                },
            });
    
            // Log the navigation path for debugging
            console.log('Navigating to:', `/view-trip/${docId}`);
    
            // Use the navigate function to redirect
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
    
    

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl flex items-center'>
                Tell us your travel preferences
                <img src="/create-trip-icons/travel.png" alt="travel" className='w-12 h-12 ml-3' />
            </h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Provide some basic information, and Atlas will generate a customized itinerary based on your preferences
            </p>
            <div>
                <div className='mt-20 flex flex-col'>
                    <h2 className='text-xl my-3 font-medium'>Destination of choice:</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v); }
                        }}
                    />

                    <div>
                        <h2 className='text-xl my-3 font-medium'>Number of nights:</h2>
                        <Input placeholder={'Ex.3'} type="number"
                            onChange={(e) => handleInputChange('numOfDays', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='mb-10'>
                <h2 className='text-xl my-3 font-medium'>Trip Budget:</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${formData?.budget === item.title && 'shadow-lg border-black'}
                    `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mb-10'>
                <h2 className='text-xl my-3 font-medium'>Trip Structure:</h2>
                <div className='grid grid-cols-2 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.traveler === item.people && 'shadow-lg border-black'}
                        `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-10 justify-end flex'>
                <Button onClick={OnGenerateTrip}>
                    {loading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Loading...
                        </div>
                    ) : (
                        'Generate Trip'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CreateTrip;
