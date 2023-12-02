import React, { useState } from 'react';
import axios from 'axios';


const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};



function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      axios.get(`${api.base}weather?q=${location}&units=imperial&APPID=${api.key}`)
      .then(response => {
        setWeather(response.data)
        setLocation('')
      })
      .catch(function(error) {
      });
    }
  }


  const dateBuilder = (d) => {
    let months = ["January" , "Febuary" , "March" , "April" , "May" , "June" , 
    "July" , "August" , "September" , "October" , "November" , "December"];
    let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
  }

 
  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp < 61) 
          ? 'app clear_sky' : 'app'
          ? 'app sunny' : 'app' 
          ? 'app cloudy' : 'app' 
          ? 'app rainy' : 'app' 
          ? 'app snowy' : 'app') 
        : 'app'}>
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Enter Location..."
              onChange={event => setLocation(event.target.value)}
              value={location}
              onKeyPress={search}
              />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
            <div className="weather">{weather.weather[0].description}</div>
            <div className="bottom">
              <div className="feels-like">
                <p className="bold">{Math.round(weather.main.feels_like)}°F</p>
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">{Math.round(weather.main.humidity)}%</p>
                <p>Humidity</p>
              </div>
              <div className="wind-speed">
                <p className="bold">{Math.round(weather.wind.speed)} MPH</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
