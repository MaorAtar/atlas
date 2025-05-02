export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: <img src="/create-trip-icons/solo.png" alt="solo" />,
        people: '1',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: <img src="/create-trip-icons/couple.png" alt="couple" />,
        people: '2 People',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: <img src="/create-trip-icons/family.png" alt="family" />,
        people: '3 to 5 People',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: <img src="/create-trip-icons/friends.png" alt="friends" />,
        people: 'Up to 10 People',
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: <img src="/create-trip-icons/low-price.png" alt="cheap" />,
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep costs on the average side',
        icon: <img src="/create-trip-icons/mod-price.png" alt="moderate" />,
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: <img src="/create-trip-icons/high-price.png" alt="luxury" />,
    },
];

export const AI_PROMPT = `Generate a detailed travel plan for a location: {location}, for {totalDays} days for {traveler}, with a {budget} budget. 
Provide the following:

1. Generate a list of hotel options 
   Provide a minimum of 4 hotels but include more if possible and relevant. 
   Each hotel must have:
   - HotelName: Name of the hotel
   - Address: Address of the hotel
   - Price: Price per night (don't put an exact price, calculate the average from the prices you found and write a price range)
   - ImageUrl: URL to hotel image
   - GeoCoordinates: {latitude: lat, longitude: long}
   - Rating: Hotel rating
   - Description: A brief description of the hotel

2. An itinerary as an array for each day (totalDays days). Each day should include:
   - Day: The specific day number (e.g., Day 1, Day 2)
   - Attractions: At least 3 attractions per day, with the following details for each attraction:
       - PlaceName: Name of the place
       - PlaceDetails: Brief details about the place
       - ImageUrl: URL to place image
       - GeoCoordinates: {latitude: lat, longitude: long}
       - TicketPricing: Price to enter (if applicable)
       - Rating: Place rating
       - BestTimeToVisit: Best time to visit the place, including a suggested time range (e.g., "Morning: 9:00 AM - 11:00 AM" or "Afternoon: 2:00 PM - 4:00 PM")
       - WeatherConditions: Weather conditions for that day
       - TimeToTravel: The approximate amount of time to dedicate to experiencing and enjoying the attraction itself (e.g, "40 min" or "3.5 hours" or "1 hour", etc.)

The response should follow this exact JSON format:

{
    "hotels": [
        {
            "hotelName": "Hotel Name",
            "address": "Hotel Address",
            "price": "Price range",
            "imageUrl": "URL to hotel image",
            "geoCoordinates": { "latitude": "lat", "longitude": "long" },
            "rating": "Hotel rating",
            "description": "Brief description of the hotel"
        },
        ...
    ],
    "itinerary": [
        {
            "day": 1,
            "attractions": [
                {
                    "placeName": "Place Name",
                    "placeDetails": "Details about the place",
                    "imageUrl": "URL to place image",
                    "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                    "ticketPricing": "Ticket pricing",
                    "rating": "Place rating",
                    "bestTimeToVisit": "best time to visit including time range",
                    "weatherConditions": "Weather conditions for that day",
                    "timeToTravel": "amount of time spent at the attraction"
                },
                ...
            ]
        },
        ...
    ]
}`;


