export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: <img src="/create-trip-icons/solo.png" alt="solo" />,
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: <img src="/create-trip-icons/couple.png" alt="couple" />,
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: <img src="/create-trip-icons/family.png" alt="family" />,
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: <img src="/create-trip-icons/friends.png" alt="friends" />,
        people: 'Up to 10 People'
    },
]

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
]

export const AI_PROMPT = `Generate a detailed travel plan for a location: {location}, for {totalDays} days for {traveler}, with a {budget} budget. 
Provide the following:

1. A list of hotels with:
    - HotelName: Name of the hotel
    - Address: Address of the hotel
    - Price: Price per night
    - ImageUrl: URL to hotel image
    - GeoCoordinates: {latitude: lat, longitude: long}
    - Rating: Hotel rating
    - Description: A brief description of the hotel

2. An itinerary for each day (totalDays days). Each day should include:
    - Day: The specific day (e.g., Day 1, Day 2)
    - Attractions for each day (at least 3 attractions per day):
        - PlaceName: Name of the place
        - PlaceDetails: Brief details about the place
        - ImageUrl: URL to place image
        - GeoCoordinates: {latitude: lat, longitude: long}
        - TicketPricing: Price to enter (if applicable)
        - Rating: Place rating
        - BestTimeToVisit: Best time to visit the place
        - WeatherConditions: Weather conditions for that day
        - TimeToTravel: Estimated travel time to the place from the hotel(s)

The response should follow this exact JSON format:

{
    "hotels": [
        {
            "hotelName": "Hotel Name",
            "address": "Hotel Address",
            "price": "Price per night",
            "imageUrl": "URL to hotel image",
            "geoCoordinates": { "latitude": "lat", "longitude": "long" },
            "rating": "Hotel rating",
            "description": "Brief description of the hotel"
        },
        ...
    ],
    "itinerary": {
        "day1": [
            {
                "placeName": "Place Name",
                "placeDetails": "Details about the place",
                "imageUrl": "URL to place image",
                "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                "ticketPricing": "Ticket pricing",
                "rating": "Place rating",
                "bestTimeToVisit": "Best time to visit",
                "weatherConditions": "Weather conditions for that day",
                "timeToTravel": "Time required to reach the location from the hotel"
            },
            {
                "placeName": "Place Name 2",
                "placeDetails": "Details about the second place",
                "imageUrl": "URL to place 2 image",
                "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                "ticketPricing": "Ticket pricing",
                "rating": "Place rating",
                "bestTimeToVisit": "Best time to visit",
                "weatherConditions": "Weather conditions for that day",
                "timeToTravel": "Time required to reach the location from the hotel"
            },
            {
                "placeName": "Place Name 3",
                "placeDetails": "Details about the third place",
                "imageUrl": "URL to place 3 image",
                "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                "ticketPricing": "Ticket pricing",
                "rating": "Place rating",
                "bestTimeToVisit": "Best time to visit",
                "weatherConditions": "Weather conditions for that day",
                "timeToTravel": "Time required to reach the location from the hotel"
            }
        ],
        "day2": [
            {
                "placeName": "Place Name 4",
                "placeDetails": "Details about the fourth place",
                "imageUrl": "URL to place 4 image",
                "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                "ticketPricing": "Ticket pricing",
                "rating": "Place rating",
                "bestTimeToVisit": "Best time to visit",
                "weatherConditions": "Weather conditions for that day",
                "timeToTravel": "Time required to reach the location from the hotel"
            },
            {
                "placeName": "Place Name 5",
                "placeDetails": "Details about the fifth place",
                "imageUrl": "URL to place 5 image",
                "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                "ticketPricing": "Ticket pricing",
                "rating": "Place rating",
                "bestTimeToVisit": "Best time to visit",
                "weatherConditions": "Weather conditions for that day",
                "timeToTravel": "Time required to reach the location from the hotel"
            },
            {
                "placeName": "Place Name 6",
                "placeDetails": "Details about the sixth place",
                "imageUrl": "URL to place 6 image",
                "geoCoordinates": { "latitude": "lat", "longitude": "long" },
                "ticketPricing": "Ticket pricing",
                "rating": "Place rating",
                "bestTimeToVisit": "Best time to visit",
                "weatherConditions": "Weather conditions for that day",
                "timeToTravel": "Time required to reach the location from the hotel"
            }
        ]
    }
}

Make sure that the itinerary includes exactly {totalDays} days of activities, and each day has at least 3 attractions listed. Make sure to only include the JSON output (no additional text).`
