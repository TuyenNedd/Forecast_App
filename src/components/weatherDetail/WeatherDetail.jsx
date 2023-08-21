import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../config/api.jsx";
import Searching from "../Searching.jsx";

const WeatherDetail = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query && query !== "") {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${api.base}weather?q=${query}&units=metric&lang=vi&APPID=${api.key}`
          );
          setWeather(response.data);
          setError(null);
        } catch (error) {
          setError("City not found");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [query]);

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}, ${month} ${date}, ${year}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
  };

  return (
    <>
      <input
        type=""
        className="rounded-xl px-4 py-2 !focus:shadow-transparent !focus:border-none text-white bg-transparent shadow-transparent placeholder-red-50 w-fit ml-5 backBlur row-start-1 row-end-2"
        placeholder="Search for a location..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setQuery(e.target.value);
            onCitySelect(e.target.value);
          }
        }}
      />
      {/* <Searching></Searching> */}
      <div className="back-g grid grid-col-2 h-fit gap-6 col-start-1 col-end-2 m-6 text-white">
        <div className="mainWeather max-w-md shadow-lg rounded-xl col-start-1 col-end-2 backBlur flex items-center flex-col justify-center">
          <div className="flex flex-col justify-center space-y-4">
            {isLoading ? (
              <div className="text-lg font-semibold text-center text-gray-700">
                Loading...
              </div>
            ) : error ? (
              <div className="text-lg font-semibold text-center ">{error}</div>
            ) : weather && weather.main ? (
              <div className="rounded-lg p-16 space-y-2">
                <div className="text-3xl font-semibold">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="tempWeather text-8xl font-light flex overflow-y-hidden">
                  <p className="flex">
                    {Math.round(weather.main.temp)}
                    <span className="tempWeather text-lg font-semibold">
                      °C
                    </span>
                  </p>
                </div>
                <div className="text-base font-semibold">
                  {dateBuilder(new Date())}
                </div>
                <div className="tempWeather text-base  font-semibold">
                  <p className="flex">
                    {Math.round(weather.main.temp_max)}{" "}
                    <span className="font-light text-gray-400">/</span>{" "}
                    {Math.round(weather.main.temp_min)}
                    <span className="tempWeather text-base font-semibold">
                      °C
                    </span>
                  </p>
                </div>
                <div className="text-xl font-semibold">
                  {weather.weather[0].main}
                </div>
                <div className="weatherIcon w-fit">
                  <img
                    className="w-[185px]"
                    src={`../../../src/assets/png-icon/${weather.weather[0].icon}.svg`}
                  ></img>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {weather && weather.main && (
          <>
            <div className="max-w-md p-6 shadow-lg rounded-xl col-start-2 col-end-3 backBlur">
              <div className="pt-2 grid grid-cols-2">
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/Wind-face.png"
                      alt=""
                      className="mr-1"
                    />
                    Wind
                  </span>
                  <span>{weather.wind.speed}m/s</span>
                </div>
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/Droplet.png"
                      alt=""
                      className="mr-1"
                    />
                    Humidity
                  </span>
                  <span>{weather.main.humidity}%</span>
                </div>
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/dashing away.png"
                      alt=""
                      className="mr-1"
                    />
                    Pressure
                  </span>
                  <span>{weather.main.pressure}hPa</span>
                </div>
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/Thermometer.png"
                      alt=""
                      className="mr-1"
                    />
                    Feelslike
                  </span>
                  <span>{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/eyes.png"
                      alt=""
                      className="mr-1"
                    />
                    Visibility
                  </span>
                  <span>{Math.round(weather.visibility / 1000)}km</span>
                </div>
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/Sunrise.png"
                      alt=""
                      className="mr-1"
                    />
                    Sunrise
                  </span>
                  <span>{formatTime(weather.sys.sunrise)}</span>
                </div>
                <div className="text-2xl flex flex-col items-center p-8">
                  <span className="flex">
                    <img
                      width={"30px"}
                      height={"30px"}
                      src="../../../src/assets/png-icon/Sunset.png"
                      alt=""
                      className="mr-1"
                    />
                    Sunset
                  </span>
                  <span>{formatTime(weather.sys.sunset)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherDetail;
