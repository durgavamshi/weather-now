import axios from 'axios'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

// Cache for API responses
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const fetchWeatherData = async (city, units = 'celsius') => {
  // Check cache first
  const cacheKey = `${city.toLowerCase()}-${units}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  try {
    // First, get coordinates for the city using geocoding
    const geocodingResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search`,
      {
        params: {
          name: city,
          count: 1,
          language: 'en',
          format: 'json'
        },
        timeout: 10000 // 10 second timeout
      }
    )
    
    if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
      throw new Error('City not found. Please try another location.')
    }
    
    const { latitude, longitude, name, country, admin1 } = geocodingResponse.data.results[0]
    
    // Set temperature unit based on preference
    const temperatureUnit = units === 'fahrenheit' ? 'fahrenheit' : 'celsius'
    const windSpeedUnit = units === 'fahrenheit' ? 'mph' : 'kmh'
    
    // Then, get weather data for these coordinates
    const weatherResponse = await axios.get(BASE_URL, {
      params: {
        latitude,
        longitude,
        current: [
          'temperature_2m', 
          'relative_humidity_2m', 
          'apparent_temperature', 
          'weather_code', 
          'wind_speed_10m', 
          'wind_direction_10m', 
          'is_day',
          'pressure_msl',
          'visibility'
        ].join(','),
        hourly: [
          'temperature_2m',
          'weather_code',
          'relative_humidity_2m',
          'wind_speed_10m'
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'sunrise',
          'sunset',
          'uv_index_max',
          'precipitation_sum',
          'wind_speed_10m_max'
        ].join(','),
        temperature_unit: temperatureUnit,
        wind_speed_unit: windSpeedUnit,
        timezone: 'auto',
        forecast_days: 7
      },
      timeout: 10000 // 10 second timeout
    })
    
    const weatherData = {
      location: { 
        name, 
        country, 
        region: admin1 || '',
        latitude, 
        longitude 
      },
      current: { 
        ...weatherResponse.data.current,
        units: weatherResponse.data.current_units 
      },
      hourly: weatherResponse.data.hourly,
      daily: weatherResponse.data.daily,
      timestamp: Date.now()
    }
    
    // Cache the response
    cache.set(cacheKey, {
      data: weatherData,
      timestamp: Date.now()
    })
    
    return weatherData
  } catch (error) {
    console.error('API Error:', error)
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.')
    } else if (error.response) {
      // Server responded with error status
      if (error.response.status === 404) {
        throw new Error('City not found. Please try another location.')
      } else if (error.response.status >= 500) {
        throw new Error('Weather service unavailable. Please try again later.')
      } else {
        throw new Error('An error occurred while fetching data. Please try again.')
      }
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error. Please check your internet connection.')
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred. Please try again.')
    }
  }
}