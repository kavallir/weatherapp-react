import './App.css';
import { useState } from "react";
import axios from "axios";

export default function App() {
  let [city, setCity] = useState();
  let [weather, setWeather] = useState({});
  let [outputText, setOutputText] = useState(false);

  function showTemperature(response) {
    setOutputText(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }

  if (outputText) {
    return (
      <div className="App">
        <h1>Weather app</h1>
        <div className="Search">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Type a city..."
              onChange={updateCity}
            />
            <input type="submit" value="Search" />
          </form>
          <ul>
            <div>The temperature is {Math.round(weather.temperature)}°C</div>
            <div>Description: {weather.description}</div>
            <div>The humidity is: {weather.humidity}%</div>
            <div>
              <img src={weather.icon} alt="Weather Icon" />
            </div>
          </ul>
        </div>
        <a href="https://github.com/kavallir/weatherapp-react" target="_blank" rel="noreferrer">Github</a>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Weather app</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Type a city..."
              onChange={updateCity}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
        <a href="https://github.com/kavallir/weatherapp-react" target="_blank" rel="noreferrer">Github</a>
      </div>
    );
  }
}