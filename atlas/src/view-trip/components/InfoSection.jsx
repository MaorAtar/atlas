import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

function InfoSection({trip}) {
  return (
    <div>
        <div className="relative h-[340px] w-full overflow-hidden rounded-xl">
            <img 
            src="/placeholder 2.png"
            className="h-[450px] w-full"
            alt="Travel placeholder"
            />
        </div>
        
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sx md:text-md'>📅 {trip.userSelection?.numOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sx md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sx md:text-md'>🥂 Number of Travelers: {trip.userSelection?.traveler}</h2>

                </div>
            </div>
        <Button>
            <Send></Send>
            Share
        </Button>
        </div>
        
    </div>
    
  );
}

export default InfoSection;
