import "./App.css";
import axios from "axios";
import Weather from "./Weather";
import React, { useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

export default function App(props) {
  let [city, setCity] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function updateCity(event) {
    setCity(event.target.value);
  }

  function showWeather(response) {
    setCity(response.data.temperature);
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      description: response.data.condition.description,
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=29a93389cbc7b063100ft3doa5403cdf`;
    axios.get(url).then(showWeather);
  }
  if (loaded) {
    return (
      <div className="App">
        <div>
          <h1>Weather app🌤️</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a city..."
              autoFocus="on"
              autoComplete="on"
              onChange={updateCity}
            />
            <input type="submit" value="Search" id="search" />
          </form>
          <Weather
            temp={Math.round(weather.temperature)}
            description={weather.description}
            humidity={weather.humidity}
            wind={weather.wind}
            icon={weather.icon}
          />
          <a href="https://github.com/Carlaji/weather-app-SHECODES">
            Github repository
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Weather app🌤️</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a city..."
            autoFocus="on"
            autoComplete="on"
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
        <br />
        <a href="https://github.com/Carlaji/weather-app-SHECODES">
          Github repository
        </a>
      </div>
    );
  }
}
