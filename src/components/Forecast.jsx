import { useState } from "react";
import { 
  Calendar, 
  Thermometer, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun,
  CloudDrizzle,
  CloudFog,
  CloudLightning
} from 'lucide-react';
import { getWeatherIconName, getWeatherDescription } from '../utils/weatherCodes';
import './Forecast.css';

const Forecast = ({ dailyData, units }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!dailyData || !dailyData.time || dailyData.time.length === 0) {
    return null;
  }

  // Get the next 5 days (excluding today)
  const forecastDays = dailyData.time.slice(1, 6);
  
  const renderIcon = (weatherCode, size = 24) => {
    const iconName = getWeatherIconName(weatherCode, 1); // Use day icons
    
    switch(iconName) {
      case 'sun': return <Sun size={size} />;
      case 'cloud': return <Cloud size={size} />;
      case 'cloud-drizzle': return <CloudDrizzle size={size} />;
      case 'cloud-rain': return <CloudRain size={size} />;
      case 'cloud-snow': return <CloudSnow size={size} />;
      case 'cloud-fog': return <CloudFog size={size} />;
      case 'cloud-lightning': return <CloudLightning size={size} />;
      default: return <Cloud size={size} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="forecast-dropdown">
      {/* Toggle Button */}
      <button 
        className="forecast-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar size={18} />
        {isOpen ? "Hide Forecast" : "Show 5-Day Forecast"}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="forecast">
          <div className="forecast-header">
            <Calendar size={20} />
            <h3>5-Day Forecast</h3>
          </div>
          
          <div className="forecast-days">
            {forecastDays.map((date, index) => (
              <div key={date} className="forecast-day">
                <div className="forecast-date">{formatDate(date)}</div>
                
                <div className="forecast-icon">
                  {renderIcon(dailyData.weather_code[index + 1])}
                </div>
                
                <div className="forecast-description">
                  {getWeatherDescription(dailyData.weather_code[index + 1])}
                </div>
                
                <div className="forecast-temps">
                  <span className="forecast-high">
                    {Math.round(dailyData.temperature_2m_max[index + 1])}°
                  </span>
                  <span className="forecast-low">
                    {Math.round(dailyData.temperature_2m_min[index + 1])}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
