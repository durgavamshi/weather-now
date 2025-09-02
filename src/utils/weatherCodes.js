// Weather code mappings based on WMO codes
export const weatherCodeMappings = {
  0: { day: 'Clear sky', night: 'Clear sky', icon: { day: 'sun', night: 'moon' } },
  1: { day: 'Mainly clear', night: 'Mainly clear', icon: { day: 'sun', night: 'moon' } },
  2: { day: 'Partly cloudy', night: 'Partly cloudy', icon: { day: 'cloud', night: 'cloud' } },
  3: { day: 'Overcast', night: 'Overcast', icon: { day: 'cloud', night: 'cloud' } },
  45: { day: 'Fog', night: 'Fog', icon: { day: 'cloud-fog', night: 'cloud-fog' } },
  48: { day: 'Depositing rime fog', night: 'Depositing rime fog', icon: { day: 'cloud-fog', night: 'cloud-fog' } },
  51: { day: 'Light drizzle', night: 'Light drizzle', icon: { day: 'cloud-drizzle', night: 'cloud-drizzle' } },
  53: { day: 'Moderate drizzle', night: 'Moderate drizzle', icon: { day: 'cloud-drizzle', night: 'cloud-drizzle' } },
  55: { day: 'Dense drizzle', night: 'Dense drizzle', icon: { day: 'cloud-drizzle', night: 'cloud-drizzle' } },
  56: { day: 'Light freezing drizzle', night: 'Light freezing drizzle', icon: { day: 'cloud-drizzle', night: 'cloud-drizzle' } },
  57: { day: 'Dense freezing drizzle', night: 'Dense freezing drizzle', icon: { day: 'cloud-drizzle', night: 'cloud-drizzle' } },
  61: { day: 'Slight rain', night: 'Slight rain', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  63: { day: 'Moderate rain', night: 'Moderate rain', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  65: { day: 'Heavy rain', night: 'Heavy rain', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  66: { day: 'Light freezing rain', night: 'Light freezing rain', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  67: { day: 'Heavy freezing rain', night: 'Heavy freezing rain', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  71: { day: 'Slight snow fall', night: 'Slight snow fall', icon: { day: 'cloud-snow', night: 'cloud-snow' } },
  73: { day: 'Moderate snow fall', night: 'Moderate snow fall', icon: { day: 'cloud-snow', night: 'cloud-snow' } },
  75: { day: 'Heavy snow fall', night: 'Heavy snow fall', icon: { day: 'cloud-snow', night: 'cloud-snow' } },
  77: { day: 'Snow grains', night: 'Snow grains', icon: { day: 'cloud-snow', night: 'cloud-snow' } },
  80: { day: 'Slight rain showers', night: 'Slight rain showers', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  81: { day: 'Moderate rain showers', night: 'Moderate rain showers', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  82: { day: 'Violent rain showers', night: 'Violent rain showers', icon: { day: 'cloud-rain', night: 'cloud-rain' } },
  85: { day: 'Slight snow showers', night: 'Slight snow showers', icon: { day: 'cloud-snow', night: 'cloud-snow' } },
  86: { day: 'Heavy snow showers', night: 'Heavy snow showers', icon: { day: 'cloud-snow', night: 'cloud-snow' } },
  95: { day: 'Thunderstorm', night: 'Thunderstorm', icon: { day: 'cloud-lightning', night: 'cloud-lightning' } },
  96: { day: 'Thunderstorm with slight hail', night: 'Thunderstorm with slight hail', icon: { day: 'cloud-lightning', night: 'cloud-lightning' } },
  99: { day: 'Thunderstorm with heavy hail', night: 'Thunderstorm with heavy hail', icon: { day: 'cloud-lightning', night: 'cloud-lightning' } },
}

// Get weather description based on code
export const getWeatherDescription = (code) => {
  const mapping = weatherCodeMappings[code] || weatherCodeMappings[0]
  return mapping.day // Use day description as default
}

// Get appropriate icon name based on code and time of day
export const getWeatherIconName = (code, isDay) => {
  const mapping = weatherCodeMappings[code] || weatherCodeMappings[0]
  return isDay ? mapping.icon.day : mapping.icon.night
}