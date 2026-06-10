# Uber Clone

Hey! This is a full-stack Uber clone I built using the MERN stack. It has two separate flows: one for passengers to book rides, and another for captains (drivers) to accept them. 

## What it does

- **Live Tracking**: Hooked up with Socket.io so passengers can watch their captain's car move on the map in real-time.
- **Google Maps Integration**: Uses the Maps API for location autocomplete, distance calculation, and rendering the live map.
- **Smart Fares**: Automatically calculates prices based on distance, time, and whether you pick a Car, Auto, or Moto.
- **Secure Rides**: Uses a 6-digit OTP verification system for the captain to start the ride, just like the real app.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, and GSAP for some smooth UI animations.
- **Backend**: Node.js, Express, and MongoDB.
- **Real-time**: Socket.io handles all the live events (like ride requests and location updates).

## How to run it

You'll need two terminals open. Make sure to set up your `.env` files in both folders first (you'll need your own Google Maps API key and MongoDB URI).

**1. Fire up the backend:**
```bash
cd Backend
npm install
node server.js
```

**2. Fire up the frontend:**
```bash
cd frontend
npm install
npm run dev
```
