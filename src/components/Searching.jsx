import React, { useState, useEffect } from "react";

const Searching = ({ onCitySelect }) => {
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
        className="rounded-lg px-4 py-2 !focus:shadow-transparent !focus:border-none text-white bg-transparent shadow-transparent placeholder-red-50 w-fit ml-3 backBlur row-start-1 row-end-2"
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
    </>
  );
};

export default Searching;
