import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';

const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const handleInputChange = (name,value) => {
        setFormData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(formData);
    },[formData])

    const OnGenerateTrip = () => {
        if(formData?.numOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast.error('Please fill all details', {
                style: {
                    backgroundColor: '#FF4136',  
                    color: '#1A1A1A'            
                }
            });
            return;
        }
        console.log(formData);
    }

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
                    onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
                }}
                />

                <div>
                <h2 className='text-xl my-3 font-medium'>Number of nights:</h2>
                    <Input placeholder={'Ex.3'} type="number" 
                    onChange={(e)=>handleInputChange('numOfDays', e.target.value)}
                    />
                </div>
            </div>
        </div>
        <div className='mb-10'>
            <h2 className='text-xl my-3 font-medium'>Trip Budget:</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item,index)=>(
                    <div key={index} 
                    onClick={()=>handleInputChange('budget', item.title)}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${formData?.budget==item.title&&'shadow-lg border-black'}
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
                {SelectTravelesList.map((item,index)=>(
                    <div key={index}
                    onClick={()=>handleInputChange('traveler', item.people)}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.traveler==item.people&&'shadow-lg border-black'}
                        `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                        <h2 className='font-bold text-lg'>{item.title}</h2>
                        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                    </div>
                ))}
            </div>
        </div>
        <div className='my-10 justify-end flex'>
            <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>

    </div>
  )
}

export default CreateTrip