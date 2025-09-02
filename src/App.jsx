import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import Forecast from './components/Forecast'
import UnitToggle from './components/UnitToggle'
import ThemeToggle from './components/ThemeToggle'
import { fetchWeatherData } from './services/weatherApi'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recentSearches, setRecentSearches] = useLocalStorage('recentWeatherSearches', [])
  const [units, setUnits] = useLocalStorage('weatherUnits', 'celsius')
  const [theme, setTheme] = useLocalStorage('appTheme', 'light')

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  const handleSearch = async (city) => {
    if (!city.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchWeatherData(city, units)
      setWeatherData(data)
      
      // Update recent searches
      const updatedSearches = [
        { city, country: data.location.country, timestamp: new Date().toISOString() },
        ...recentSearches.filter(item => item.city.toLowerCase() !== city.toLowerCase())
      ].slice(0, 5) // Keep only 5 most recent searches
      
      setRecentSearches(updatedSearches)
    } catch (err) {
      setError(err.message)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRecentSearch = (city) => {
    handleSearch(city)
  }

  const handleUnitChange = (newUnits) => {
    setUnits(newUnits)
    // Refresh weather data if we already have a location
    if (weatherData) {
      handleSearch(weatherData.location.name)
    }
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <div className={`app-container ${theme}`}>
      <div className="app">
        <header className="app-header">
          <div className="header-top">
            <h1>Weather Now</h1>
            <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
          </div>
          <p>Get current weather conditions for any city</p>
        </header>
        
        <main className="app-main">
          <UnitToggle units={units} onUnitChange={handleUnitChange} />
          <SearchBar 
            onSearch={handleSearch} 
            recentSearches={recentSearches}
            onRecentSearch={handleRecentSearch}
          />
          
          {loading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
          
          {weatherData && !loading && (
            <div className="fade-in">
              <WeatherCard data={weatherData} units={units} />
              <Forecast dailyData={weatherData.daily} units={units} />
            </div>
          )}
          
          {!weatherData && !loading && !error && (
            <div className="welcome-message slide-up">
              <h2>Welcome to Weather Now!</h2>
              <p>Enter a city name above to get current weather information.</p>
              {recentSearches.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <p>Recent searches:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(search.city)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '20px',
                          padding: '0.4rem 0.8rem',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                      >
                        {search.city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
        
        <footer className="app-footer">
          <p>Built with React & Open-Meteo API</p>
        </footer>
      </div>
    </div>
  )
}

export default App