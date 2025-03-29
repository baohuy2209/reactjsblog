import "./Weather.css";
import React from "react";
import axios from "axios";
const Weather = () => {
  const [data, setData] = React.useState({});
  const [location, setLocation] = React.useState("");
  React.useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Hanoi";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=c463277c96f9b430ab553b854e007161`;
      const response = await axios.get(url);
      setData(response.data);
    };
    fetchDefaultLocation();
  }, []);
  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c463277c96f9b430ab553b854e007161`;
    try {
      const response = await axios.get(url);
      if (response.date.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation(data.name);
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("Error fetching weather data:", e.message);
      }
    }
  };
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Haze":
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            name="location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (
        <div>Not Found</div>
      ) : (
        <div className="weather-data">
          {data.weather &&
            data.weather[0] & getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}*` : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
