import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherData {
  current: {
    temp: number;
    weather: Array<{ description: string }>;
    humidity: number;
    wind_speed: number;
  };
  daily: Array<{
    dt: number;
    temp: { day: number };
    weather: Array<{ main: string }>;
  }>;
}

interface WeatherAlert {
  id: number;
  type: string;
  severity: string;
  description: string;
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `/api/weather/forecast/${position.coords.latitude}/${position.coords.longitude}`
          );
          if (!response.ok) throw new Error('Failed to fetch weather data');
          const data = await response.json();
          setWeatherData(data);
          
          // Fetch weather alerts
          const alertsResponse = await fetch('/api/weather/alerts');
          if (!alertsResponse.ok) throw new Error('Failed to fetch alerts');
          const alertsData = await alertsResponse.json();
          setAlerts(alertsData);
        } catch (err) {
          setError('Failed to load weather data');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Please enable location access to view weather data');
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center py-12">No weather data available</div>;
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return Sun;
      case 'clouds':
        return Cloud;
      case 'rain':
        return CloudRain;
      default:
        return Cloud;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Weather Forecast</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            {React.createElement(getWeatherIcon(weatherData.current.weather[0].description), {
              className: "h-16 w-16 text-yellow-500"
            })}
            <div>
              <h2 className="text-4xl font-bold">{Math.round(weatherData.current.temp)}°C</h2>
              <p className="text-gray-600">{weatherData.current.weather[0].description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Humidity</p>
              <p className="text-xl font-semibold">{weatherData.current.humidity}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Wind Speed</p>
              <p className="text-xl font-semibold">{Math.round(weatherData.current.wind_speed)} km/h</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-5 gap-4">
            {weatherData.daily.slice(1, 6).map((day) => {
              const Icon = getWeatherIcon(day.weather[0].main);
              return (
                <div key={day.dt} className="text-center">
                  <p className="text-gray-600">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <Icon className="h-8 w-8 mx-auto my-2 text-gray-600" />
                  <p className="font-semibold">{Math.round(day.temp.day)}°C</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Weather Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{alert.type}</p>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                </div>
                <span className={`px-2 py-1 rounded ${
                  alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                  alert.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Crop Advisory</h3>
          <div className="space-y-4">
            {weatherData.current.temp > 30 ? (
              <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg">
                High temperature alert: Consider additional irrigation
              </div>
            ) : null}
            {weatherData.current.humidity > 80 ? (
              <div className="p-3 bg-blue-50 text-blue-800 rounded-lg">
                High humidity warning: Monitor for fungal diseases
              </div>
            ) : null}
            {weatherData.current.wind_speed > 20 ? (
              <div className="p-3 bg-red-50 text-red-800 rounded-lg">
                Strong winds: Protect young plants and secure equipment
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}