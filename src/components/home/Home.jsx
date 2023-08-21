import React, { useState, useEffect } from "react";
import WeatherDetail from "../weatherDetail/WeatherDetail.jsx";
import WeatherForecast from "../weatherForecast/WeatherForecast.jsx";
import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, Flowbite, DarkThemeToggle } from "flowbite-react"; // Import Dropdown and Avatar
import SignOut from "../GGLogin/signOut.jsx";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const displayName = localStorage.getItem("displayName");
  const photoURL = localStorage.getItem("photoURL");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    // Hide elements with class "h-4"
    const arrowSVG = document.getElementsByClassName("h-4")[0];
    if (arrowSVG) {
      arrowSVG.style.display = "none";
    }

    // Modify element with data-testid "flowbite-avatar-img"
    const avatarElement = document.querySelector(
      '[data-testid="flowbite-avatar-img"]'
    );
    if (avatarElement) {
      avatarElement.style.width = "60px";
      avatarElement.style.height = "60px";
    }

    const statusElement = document.querySelector(
      '[data-testid="flowbite-avatar-status"]'
    );
    if (statusElement) {
      statusElement.style.width = "20px";
      statusElement.style.height = "20px";
    }

    // const dropDElement = document.getElementsByClassName("my-1")[(0, 1)];
    // // const dropDElement = document.querySelector(
    // //   '[data-testid="flowbite-dropdown"]'
    // // );
    // if (dropDElement) {
    //   // dropDElement.classList.add("backBlur");
    //   dropDElement.style.display = "none";
    // }
  }, []);

  return (
    <>
      <div className="weatherContain min-h-screen grid grid-cols-2 relative	pt-3 overflow-y-hidden h-[715px]">
        <div className="vid">
          <video
            autoPlay
            muted
            loop
            preload="auto"
            src="../src/assets/videos/river_-_86173 (Original).mp4"
          ></video>
        </div>

        <div className="flex col-start-3 col-end-2 mx-7 flex-row-reverse text-white items-center">
          <Flowbite>
            <Dropdown
              className=" !text-white border-none"
              inline
              label={
                <Avatar
                  className="ml-3"
                  alt="User settings"
                  img={photoURL}
                  rounded
                  status="online"
                  statusPosition="bottom-right"
                />
              }
            >
              <Dropdown.Header className="">
                <span className="block text-sm">{displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="">Dashboard</Dropdown.Item>
              <Dropdown.Item className="">Settings</Dropdown.Item>
              <Dropdown.Item className="">Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="">
                <SignOut onSignOut={handleSignOut} />
              </Dropdown.Item>
            </Dropdown>
          </Flowbite>
          <p>Welcome, {displayName}</p>
        </div>

        {/* <div className="inFor flex">
          {displayName && (
            <>
              {photoURL && (
                <Avatar
                  className="mr-2"
                  img={photoURL} // Use photoURL for Avatar's image
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <div className=" flex flex-col">
                <p>Welcome, {displayName}!</p>
                <SignOut onSignOut={handleSignOut} />
              </div>
            </>
          )}
        </div> */}

        {/* <Dropdown
          inline
          label={<Avatar alt="User settings" img={photoURL} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">{displayName}</span>{" "}
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <SignOut onSignOut={handleSignOut} />
          </Dropdown.Item>
        </Dropdown> */}

        <WeatherDetail onCitySelect={handleCitySelect} />
        <WeatherForecast selectedCity={selectedCity} />
      </div>
    </>
  );
};

export default Home;
