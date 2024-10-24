import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchForm from "./components/SearchForm"; 
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
   const [backgroundImage, setBackgroundImage] = useState("");

  const handleSearch = async (city) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      console.log(data); 

      if (data.main) {
        setWeatherData({
          name: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });

  
        setBackgroundImage(getBackgroundImage(data.weather[0].main));
      } else {
        alert("City not found! Please enter a valid city name.");
      }
    } catch (error) {
      alert(error.message); 
    }
  };


  const getBackgroundImage = (condition) => {
    switch (condition) {
      case "Clear":
      case "Sunny":
        return 'url("./images/sunny.jpg")';
      case "Rain":
      case "Drizzle":
        return 'url("./images/rainy.jpg")';
      case "Clouds":
        return 'url("./images/cloudy.jpg")';
      case "Haze":
        return 'url("./images/haze.jpg")';
      case "Mist":
        return 'url("./images/mist.webp")';

      
      default:
        return 'url("./main.jpg")'; 
    }
  };

  return (
    <div className="container" style={{ backgroundImage }}>
      <h1>Weather App</h1>
      <SearchForm onSearch={handleSearch} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
  );
}

export default App;
