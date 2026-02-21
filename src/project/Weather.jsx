// import { fetchWeatherApi } from "openmeteo";
import { useState } from "react";

export function Weather() {
  const [weathers, setWeathers] = useState({
    location: {
      name: "Delhi",
      region: "Ontario",
      country: "Canada",
      lat: 42.85,
      lon: -80.5,
      tz_id: "America/Toronto",
      localtime_epoch: 1771647354,
      localtime: "2026-02-20 23:15",
    },
    current: {
      last_updated_epoch: 1771647300,
      last_updated: "2026-02-20 23:15",
      temp_c: 0.1,
      temp_f: 32.2,
      is_day: 0,
      condition: {
        text: "Light freezing rain",
        icon: "//cdn.weatherapi.com/weather/64x64/night/311.png",
        code: 1198,
      },
      wind_mph: 19.2,
      wind_kph: 31.0,
      wind_degree: 245,
      wind_dir: "WSW",
      pressure_mb: 1007.0,
      pressure_in: 29.73,
      precip_mm: 0.03,
      precip_in: 0.0,
      humidity: 91,
      cloud: 0,
      feelslike_c: -6.4,
      feelslike_f: 20.4,
      windchill_c: -6.6,
      air_quality: {
        co: 202.837,
        no2: 4.837,
        o3: 64.0,
        so2: 1.837,
        pm2_5: 2.837,
        pm10: 2.837,
        "us-epa-index": 1,
        "gb-defra-index": 1,
      },
      short_rad: 0,
      diff_rad: 0,
      dni: 0,
      gti: 0,
    },
  });
  const [city, setCity] = useState("");
  // const [fetch,setFetch] = useState(false);
  const [fetching, setFetching] = useState(false);

  const key = "c5c8bdaa2f12487ab3432511262102";
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`;

  async function fetchWeatherDetails() {
    if (fetching) {
      return;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeathers(data);
      // setWeathers(response);
      setFetching(false);
      console.log(`FETCHED DATA \n\n\n\n`);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className="text-3xl font-bold text-center p-10 m-10 ">Weather</p>
      {/* Fetch  */}
      <input
        type="text"
        onChange={(event) => {
          setCity(event.target.value);
        }}
        className="border-3 rounded-3xl text-balance text-center "
        placeholder="Search"
        value={city}
        onKeyUp={(event) => {
          if (event.key === "Enter" && !fetching) {
            setFetching(true);
            setCity("");
            console.log(city);
            fetchWeatherDetails();
          }
        }}
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl m-3 ">
        Fetch
      </button>

      <div className="flex flex-col space-y-4 p-10 border-4 rounded-3xl border-blue-500  ">
        <span className="text-xl">City : {weathers.location.name}</span>
        <span className="text-lg">
          Region : {weathers.location.region}/ {weathers.location.country}
        </span>
        <span className="text-lg">{weathers.location.localtime}</span>

        <span className="text-lg">Lat : {weathers.location.lat}</span>
        <span className="text-lg">Long : {weathers.location.lon}</span>

        <p className="text-3xl font-bold animate-pulse">
          Condition : {weathers.current.temp_c}
        </p>
        <span className="text-2xl animate-none">
          {weathers.current.condition.text}
          <img
            src={weathers.current.condition.icon}
            alt=""
            className="animate-pulse"
          />
        </span>

        <span className="text-2xl animate-bounce">
          Wind : {weathers.current.wind_kph}
        </span>
        <span className="text-2xl animate-bounce">
          Humidity : {weathers.current.humidity}
        </span>
        <span className="text-2xl animate-bounce">
          Wind : {weathers.current.humidity}
        </span>

        <p className="text-2xl font-bold animate-fade-in">
          Air Quality : no2 : {weathers.current.air_quality.no2}
          Pm 2.5 {weathers.current.air_quality.pm2_5}
          Pm pm10 : {weathers.current.air_quality.pm10}
        </p>
      </div>
    </div>
  );
}

/*
Fetch real-time weather and use useEffect for auto-updates.


FEATURE 
- Fetch City , based on location of browsers 
- Multiple Places Weather  
- Search City 
- Add City to favourites 
- Remove City from favourites 
- Save Favourites and response in localstorage , and load them on page load  

concept 
- env for api key 

REACT 
state , localStorage , useEffect 

- Change Prettier to more better 
*/
