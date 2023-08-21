import React from "react";
import { addDays, format } from "date-fns";

const NextDayForecast = ({ forecastData }) => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className=" text-white">
      <div className=" lg:overflow-y-auto overflow-y-hidden">
        {forecastData.map((forecast, index) => {
          const forecastDate = new Date(forecast.dt * 1000);
          const dayName = daysOfWeek[forecastDate.getDay()];

          let dateString;
          if (forecastDate.toDateString() === today.toDateString()) {
            dateString = "Today";
          } else if (forecastDate.toDateString() === tomorrow.toDateString()) {
            dateString = "Tomorrow";
          } else {
            dateString = dayName;
          }

          return (
            <div
              key={index}
              className="shadow-md p-[18px] rounded-xl flex justify-between backBlur mb-2"
            >
              <p className="w-[100px]">{dateString}</p>
              {/* <p className="">Humidity: {forecast.main.humidity}%</p> */}
              <div className="weatherIcon w-fit">
                <img
                  className="w-[30px]"
                  // src={`../../../src/assets/weather-icon/${forecast.weather[0].icon}.svg`}
                  src={`/src/assets/weather-icon/${forecast.weather[0].icon}.svg`}
                ></img>
              </div>
              <div className="flex">
                <p className="w-[150px]">{forecast.weather[0].description}</p>
                <p className="flex ml-5">
                  {Math.round(forecast.main.temp_max)}{" "}
                  <span className="font-light text-gray-400">/</span>{" "}
                  {Math.round(forecast.main.temp_min)}
                  <span className="tempWeather text-base font-semibold">
                    °C
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NextDayForecast;
