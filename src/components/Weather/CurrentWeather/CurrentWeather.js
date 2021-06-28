import React from "react";

import classes from "./CurrentWeather.module.css";

import LocationForm from "./LocationForm";
import LocationWeather from "./LocationWeather";

const CurrentWeather = (props) => {
  return (
    <div className={classes["current-weather"]}>
      <LocationForm
        fetchCurrent={props.fetchCurrent}
        fetchDaily={props.fetchDaily}
        setIsLoading={props.setIsLoading}
      />
      <LocationWeather current={props.current} isLoading={props.isLoading} />
    </div>
  );
};

export default CurrentWeather;
