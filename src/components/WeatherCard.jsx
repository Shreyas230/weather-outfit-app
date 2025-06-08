import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
    </div>
  );
};

export default WeatherCard;
