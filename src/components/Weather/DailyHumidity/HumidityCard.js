import React from "react";

import classes from "./HumidityCard.module.css";

import Card from "../../UI/Card";

const HumidityCard = (props) => {
  const weatherIcon = props.daily
    ? `http://openweathermap.org/img/wn/${props.daily.icon}@2x.png`
    : `http://openweathermap.org/img/wn/02d@2x.png`;

  return (
    <Card className={classes["card-humidity"]}>
      <p>{props.daily.timestamp}</p>
      <span>
        <img src={weatherIcon} alt="weather-icon" />
      </span>
      <div className={classes.humidity}>
        <p>Humidity</p>
        <p>{props.daily.humidity}%</p>
      </div>
    </Card>
  );
};

export default HumidityCard;
