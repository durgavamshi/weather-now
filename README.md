Weather Now Application
Overview
Weather Now is a responsive web application designed for outdoor enthusiasts who need quick access to current weather conditions for any city. Built with a modern frontend framework, this app provides an intuitive interface for checking weather data with minimal effort.

Features
Current Weather Search: Get real-time weather data for any city worldwide

Responsive Design: Optimized for both desktop and mobile devices

Clean UI/UX: Simple, intuitive interface with clear weather information

Error Handling: Graceful handling of invalid locations and network issues

Visual Weather Indicators: Icons representing current weather conditions

Technology Stack
Framework: React
Styling: CSS
API: Open-Meteo API (free, no authentication required)
State Management: React hooks (useState, useEffect)

API Integration
This application uses the Open-Meteo API to fetch weather data:

Current weather endpoint: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m

Getting Started
Prerequisites
Node.js (v14 or higher)

npm or yarn

Installation
Clone the repository:

bash
git clone [repository-url]
cd weather-now
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Open http://localhost:3000 to view the app in your browser.

Usage
Enter a city name in the search input field

Press Enter or click the search button

View current weather conditions including temperature, humidity, wind speed, and weather description

Search for another location at any time
