Weather Now 🌤️
A modern, responsive weather application built with React that provides current weather conditions for any city worldwide.

Features
Current Weather Data: Temperature, humidity, wind speed, and more

Beautiful UI: Glassmorphism design with smooth animations

Responsive Design: Works perfectly on desktop, tablet, and mobile devices

Search Functionality: Find weather by city name

Error Handling: User-friendly error messages

Loading States: Elegant loading spinner during API calls

Technologies Used
React: Frontend framework

Vite: Build tool and development server

Axios: HTTP client for API requests

Lucide React: Modern icon library

CSS3: Styling with modern features like backdrop-filter

Installation
Clone the repository:

bash
git clone <your-repo-url>
cd weather-now
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev


Building for Production
To create a production build:

bash
npm run build
Project Structure
text
weather-now/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WeatherCard.jsx          # Displays weather information
│   │   ├── WeatherCard.css
│   │   ├── SearchBar.jsx            # City search input
│   │   ├── SearchBar.css
│   │   ├── LoadingSpinner.jsx       # Loading indicator
│   │   ├── LoadingSpinner.css
│   │   ├── ErrorMessage.jsx         # Error display component
│   │   └── ErrorMessage.css
│   ├── services/
│   │   └── weatherApi.js            # API integration
│   ├── utils/
│   │   └── weatherCodes.js          # Weather code mappings
│   ├── App.jsx                      # Main application component
│   ├── App.css
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── package.json
├── vite.config.js
├── index.html
└── README.md
API Usage
This application uses the Open-Meteo Weather API for weather data and geocoding. The API is free to use and does not require an API key.
