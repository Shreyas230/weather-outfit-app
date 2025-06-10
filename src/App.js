import React, { useState } from 'react';
import axios from 'axios';
import OutfitSuggestion from './components/OutfitSuggestion';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getForecast = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(forecastUrl);
    return response.data;
  };

  const getWeather = async () => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await axios.get(url);
      setWeather(res.data);

      const forecastData = await getForecast(city);
      const filtered = forecastData.list.filter((item, index) => index % 8 === 0).slice(1, 4);
      setForecast(filtered);

      generateSuggestions(res.data.main.temp);
    } catch (error) {
      console.error(error);
      alert('City not found');
    }
  };

  const generateSuggestions = (temp) => {
    let outfits = [];
    if (temp >= 30) {
      outfits = ['T-shirt', 'Shorts', 'Sunglasses'];
    } else if (temp >= 20) {
      outfits = ['Shirt', 'Jeans'];
    } else if (temp >= 10) {
      outfits = ['Jacket', 'Sweater', 'Boots'];
    } else {
      outfits = ['Heavy Coat', 'Gloves', 'Scarf'];
    }
    setSuggestions(outfits);
  };

  const handleBack = () => {
    setCity('');
    setWeather(null);
    setForecast([]);
    setSuggestions([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌦️ Weather Forecast</h1>
        {!weather ? (
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={city}
              onChange={handleChange}
              placeholder="Enter city name"
              style={styles.input}
            />
            <button onClick={getWeather} style={styles.button}>
              Get Weather
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleBack} style={styles.backButton}>
              ← Back
            </button>
            <div style={styles.weatherBox}>
              <h2 style={styles.cityName}>{weather.name}</h2>
              <p style={styles.description}>{weather.weather[0].description}</p>
              <p style={styles.temperature}>🌡️ Temperature: {weather.main.temp}°C</p>
              <OutfitSuggestion suggestions={suggestions} />
            </div>

            {forecast.length > 0 && (
              <div style={styles.forecastBox}>
                <h3 style={styles.forecastTitle}>🗓️ 3-Day Forecast</h3>
                <div style={styles.forecastGrid}>
                  {forecast.map((item, index) => (
                    <div key={index} style={styles.forecastCard}>
                      <p style={styles.forecastDate}>
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <p style={styles.forecastDescription}>{item.weather[0].description}</p>
                      <p style={styles.forecastTemp}>Temp: {item.main.temp}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #e0f7fa, #80deea)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  inputContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1e40af',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6b7280',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background-color 0.2s',
  },
  weatherBox: {
    backgroundColor: '#f0f9ff',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
  },
  cityName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  description: {
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  temperature: {
    fontSize: '1.125rem',
    color: '#374151',
  },
  forecastBox: {
    backgroundColor: '#f0f9ff',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  forecastTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  forecastGrid: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  },
  forecastCard: {
    backgroundColor: '#ffffff',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  forecastDate: {
    fontWeight: '500',
    color: '#374151',
  },
  forecastDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  forecastTemp: {
    fontSize: '0.875rem',
    color: '#374151',
  },
};

export default App;
