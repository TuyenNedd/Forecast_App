import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../../firebase/firebase.config.jsx";
import api from "../../config/api.jsx";
import NextDayForecast from "./NextDayForeCast.jsx";

const WeatherForecast = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch data from OpenWeatherMap API
    if (selectedCity && selectedCity !== "") {
      axios
        .get(
          `${api.base}forecast?q=${selectedCity}&units=metric&APPID=${api.key}`
        )
        .then((response) => {
          // Upload data to Realtime Database
          // const db = getDatabase(app);
          // const weatherRef = ref(db, "weatherData");

          setWeatherData(response.data);
          // push(weatherRef, response.data)
          //   .then(() => {
          //     // Set weather data state
          //   })
          //   .catch((error) => {
          //     console.error("Error adding data:", error);
          //   });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedCity]);

  const filteredNextDay = weatherData
    ? weatherData.list.filter((forecast, index, arr) => {
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        const prevForecastDate =
          index > 0
            ? new Date(arr[index - 1].dt * 1000).toLocaleDateString()
            : null;
        return forecastDate !== prevForecastDate;
      })
    : [];

  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();

  const filteredForecast = weatherData
    ? weatherData.list.filter((forecast) => {
        const forecastTime = new Date(forecast.dt_txt).getHours();
        return forecastTime >= 3 && forecastTime <= 21;
      })
    : [];

  return (
    <>
      <div className="min-h-screen col-start-2 col-end-3 grid text-white m-8">
        <div className="max-w-6xl mx-auto">
          {weatherData ? (
            <div className="px-4 grid grid-cols-1 lg:grid-cols-1 gap-4 shadow-lg rounded-xl mb-2 backBlur">
              <div className="weatherHour lg:overflow-x-auto overflow-x-scroll hide-scrollbar">
                <div className="flex space-x-8 py-4 ">
                  {filteredForecast.map((forecast, index) => (
                    <div key={index} className="text-center">
                      {/* {forecast.dt_txt} */}
                      <p className="">
                        {new Date(forecast.dt_txt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <div className="weatherIcon w-fit">
                        <img
                          className="w-[185px]"
                          // src={`../../../src/assets/weather-icon/${forecast.weather[0].icon}.svg`}
                          src={`/src/assets/weather-icon/${forecast.weather[0].icon}.svg`}
                        ></img>
                      </div>
                      <p className="">{Math.round(forecast.main.temp)}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center mt-4"></p>
          )}
          <NextDayForecast forecastData={filteredNextDay} />
        </div>
      </div>
    </>
  );
};

export default WeatherForecast;
