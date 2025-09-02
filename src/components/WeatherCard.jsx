import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Navigation, 
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  Gauge,
  Eye,
  Sunrise,
  Sunset
} from 'lucide-react'
import { getWeatherIconName, getWeatherDescription } from '../utils/weatherCodes'
import './WeatherCard.css'

const WeatherCard = ({ data, units }) => {
  const { location, current, daily } = data
  const iconName = getWeatherIconName(current.weather_code, current.is_day)
  
  // Format the last updated time
  const lastUpdated = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  // Get today's sunrise and sunset (with fallback)
  const todaySunrise = daily?.sunrise?.[0] || '';
  const todaySunset = daily?.sunset?.[0] || '';
  
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Safe value access with fallback
  const getValue = (value, unit = '') => {
    if (value === undefined || value === null) return 'N/A';
    return `${value}${unit}`;
  };
  
  // Render the appropriate icon based on the name
  const renderIcon = () => {
    const size = 64;
    switch(iconName) {
      case 'sun': return <Sun size={size} />;
      case 'moon': return <Moon size={size} />;
      case 'cloud': return <Cloud size={size} />;
      case 'cloud-drizzle': return <CloudDrizzle size={size} />;
      case 'cloud-rain': return <CloudRain size={size} />;
      case 'cloud-snow': return <CloudSnow size={size} />;
      case 'cloud-fog': return <CloudFog size={size} />;
      case 'cloud-lightning': return <CloudLightning size={size} />;
      default: return <Cloud size={size} />;
    }
  }

  return (
    <div className="weather-card">
      <div className="weather-location">
        <h2>{location.name}{location.region ? `, ${location.region}` : ''}, {location.country}</h2>
        <div className="coordinates">
          Lat: {location.latitude.toFixed(2)}°, Long: {location.longitude.toFixed(2)}°
        </div>
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">
          {renderIcon()}
        </div>
        <div className="weather-temp">
          <h3>{Math.round(current.temperature_2m)}{current.units?.temperature_2m || '°C'}</h3>
          <p>{getWeatherDescription(current.weather_code)}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Thermometer size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Feels like</div>
            <div className="weather-detail-value">
              {getValue(Math.round(current.apparent_temperature), current.units?.temperature_2m || '°C')}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Droplets size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Humidity</div>
            <div className="weather-detail-value">
              {getValue(current.relative_humidity_2m, current.units?.relative_humidity_2m || '%')}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Wind size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Wind Speed</div>
            <div className="weather-detail-value">
              {getValue(Math.round(current.wind_speed_10m), ` ${current.units?.wind_speed_10m || 'km/h'}`)}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Navigation 
              size={20} 
              style={{ transform: `rotate(${current.wind_direction_10m || 0}deg)` }} 
            />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Wind Direction</div>
            <div className="weather-detail-value">
              {getValue(current.wind_direction_10m, '°')}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Gauge size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Pressure</div>
            <div className="weather-detail-value">
              {getValue(current.pressure_msl, ' hPa')}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Eye size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Visibility</div>
            <div className="weather-detail-value">
              {getValue(current.visibility, ' km')}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Sunrise size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Sunrise</div>
            <div className="weather-detail-value">
              {formatTime(todaySunrise)}
            </div>
          </div>
        </div>
        
        <div className="weather-detail">
          <div className="weather-detail-icon">
            <Sunset size={20} />
          </div>
          <div className="weather-detail-content">
            <div className="weather-detail-label">Sunset</div>
            <div className="weather-detail-value">
              {formatTime(todaySunset)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="last-updated">
        Last updated: {lastUpdated}
      </div>
    </div>
  )
}

export default WeatherCard