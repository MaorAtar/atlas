# Atlas: AI-Powered Personalized Travel Planning

![Logo](https://i.postimg.cc/vHW7kDFg/atlas-icon.png)

### Overview

Atlas is a full-stack AI-powered web application designed to help users effortlessly plan personalized travel itineraries. Users can input details like destination, budget, trip duration, and traveler type, and the system instantly generates a detailed, day-by-day travel plan using AI. The platform also features a user dashboard to manage saved trips and an admin panel with analytics on users, trip data, and popular destinations.

## Target Audience

Atlas is built for individual travelers, groups, and travel agents seeking a fast, automated, and tailored way to create professional travel itineraries, while saving time and improving the overall travel planning experience.

### Key Features

AI-generated multi-day travel plans based on user inputs Using OpenAI API.

Personalized itineraries with destination images via Google Places API.

User authentication and role management with Clerk.

User dashboard to view and manage saved trips.

Admin dashboard for managing users, analyzing trip data, and viewing travel trends.

CSV export for trip data.

## Installation

Create a new .env.local file and add your keys in the following manner:

```
VITE_GOOGLE_PLACE_API_KEY=
VITE_OPENAI_API_KEY=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_FIREBASE_KEY=
VITE_BACKEND_URL=

```

1. Clone the Repository

```
git clone https://github.com/MaorAtar/atlas.git
```

2. Install Dependencies:

```
cd atlas
npm install
```

🔗 Note: You'll also need to set up the backend server for image fetching via Google Places API. You can use this boilerplate: https://github.com/MaorAtar/atlas-backend

3. Start the Development Server:

```
npm run dev
```

## Screenshots

# Homepage

![App Screenshot](https://i.postimg.cc/gkwWyw5h/Homepage.png)

# Generate Trip Page

![App Screenshot](https://i.postimg.cc/W49DFFCy/Generate-trip-page.png)

# View Trip Page

![App Screenshot](https://i.postimg.cc/CL4QqwM8/View-trip-page1.png)

# My Trips Page

![App Screenshot](https://i.postimg.cc/3wQ0QQpL/My-trips-page.png)

# Admin Dashboard

![App Screenshot](https://i.postimg.cc/ydZV1DHc/Admin-Dashboard.png)

# Manage Users

![App Screenshot](https://i.postimg.cc/VsK7fDK9/Manage-Users.png)

## Generate Your Personalized Trip Now

https://atlas-azure.vercel.app/

## Author

- [@MaorAtar](https://github.com/MaorAtar)
- [@GuyEzra](https://github.com/GuyEzraSCE)
