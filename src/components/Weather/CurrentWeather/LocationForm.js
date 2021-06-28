import React, { useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseAnimations from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";

import classes from "./LocationForm.module.css";

import { captalizeFirstWord, formatedTimestamp } from "../../Utils/Utils";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const LocationForm = (props) => {
  const inputRef = useRef();

  const warnMsg = (
    <div className={classes.icon}>
      <UseAnimations animation={alertOctagon} size={24} strokeColor="white" />
      <p>Please, enter a city name !</p>
    </div>
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    let lat, lon;

    const enteredCity = inputRef.current.value;

    if (!enteredCity.trim()) {
      toast.warn(warnMsg, toastConfig);
      return;
    }

    props.setIsLoading(true);

    const getlatLonUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${enteredCity}&limit=1&appid=${process.env.REACT_APP_WEATHER_KEY}`;

    try {
      const coordsResponse = await fetch(getlatLonUrl);

      if (!coordsResponse.ok) {
        throw new Error("🌧️ Unable to fetch weather data !");
      }

      const coordsData = await coordsResponse.json();

      if (coordsData.length === 0) {
        throw new Error("🌧️ Please, enter a valid city name !");
      }

      lat = coordsData[0].lat;
      lon = coordsData[0].lon;

      const getWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER_KEY}`;

      const weatherResponse = await fetch(getWeatherUrl);

      if (!weatherResponse.ok) {
        throw new Error("🌧️ Unable to fetch weather data !");
      }

      const weatherData = await weatherResponse.json();

      const formattedCurrentData = {
        timestamp: formatedTimestamp(weatherData.current.dt, "current"),
        temp: weatherData.current.temp,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.wind_speed,
        description: captalizeFirstWord(
          weatherData.current.weather[0].description
        ),
        icon: weatherData.current.weather[0].icon,
      };

      weatherData.daily.shift();
      const dailyData = weatherData.daily;

      const formatedDailyData = dailyData.map((data) => ({
        timestamp: formatedTimestamp(data.dt, "daily"),
        temp: data.temp.max,
        humidity: data.humidity,
        icon: data.weather[0].icon,
      }));

      props.fetchCurrent(formattedCurrentData);
      props.fetchDaily(formatedDailyData);
      props.setIsLoading(false);
    } catch (err) {
      toast.error(err.message, toastConfig);
      props.setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="city">Your City</label>
        <input
          placeholder="City Name"
          type="text"
          id="city"
          ref={inputRef}
        ></input>
        <button className={classes.btn} type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default LocationForm;
