import React from "react";

import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

import classes from "./LocationWeather.module.css";

const LocationWeather = (props) => {
  const weatherIcon = props.current
    ? `https://openweathermap.org/img/wn/${props.current.icon}@2x.png`
    : `https://openweathermap.org/img/wn/02d@2x.png`;

  return (
    <div className={classes["location-weather"]}>
      <p className={classes.timestamp}>
        {props.current?.timestamp ?? "-- Hrs"}
      </p>
      <div className={classes.temperature}>
        <div className={classes["icon-temp"]}>
          <span>
            {props.isLoading ? (
              <UseAnimations
                animation={loading}
                size={100}
                strokeColor="white"
              />
            ) : (
              <img src={weatherIcon} alt="weather-icon" />
            )}
          </span>
          <h1>{props.current ? props.current.temp : "--"}°C</h1>
        </div>
        <h1>{props.current ? props.current.description : "----"}</h1>
      </div>
      <div className={classes["humidity-wind"]}>
        <div>
          <h2>Humidity</h2>
          <p>{props.current ? props.current.humidity : "--"}%</p>
        </div>
        <div>
          <h2>Wind Speed</h2>
          <p>{props.current ? props.current.windSpeed : "--"}m/s</p>
        </div>
      </div>
    </div>
  );
};

export default LocationWeather;
