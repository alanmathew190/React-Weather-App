import React from "react";

function WeatherCard({ weatherData }) {
  return (
    <div>
      <h2>{weatherData.name}</h2>
      <h3>Temperature: {weatherData.temperature}°C</h3>
      <h3>Condition: {weatherData.description}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt="Weather Icon"
      />
    </div>
  );
}

export default WeatherCard;
