import React from "react";
import FadeIn from "react-fade-in";

import classes from "./DailyHumidity.module.css";

import HumidityCard from "./HumidityCard";

const DailyHumidity = React.memo((props) => {
  return (
    <FadeIn
      delay={80}
      transitionDuration={800}
      className={classes["daily-humidity"]}
    >
      {props.daily.map((data) => (
        <HumidityCard key={data.timestamp} daily={data} />
      ))}
    </FadeIn>
  );
});

export default DailyHumidity;
