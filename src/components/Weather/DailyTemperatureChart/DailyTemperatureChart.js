import React from "react";

import { Line } from "react-chartjs-2";

import FadeIn from "react-fade-in";

import classes from "./DailyTemperatureChart.module.css";

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (tooltipItems) {
          return tooltipItems[0].formattedValue + " °C";
        },
        label: function (_tooltipItem) {
          return "";
        },
      },
      titleColor: "white",
      backgroundColor: "rgba(0, 0, 0, 0)",
      titleFont: {
        size: 20,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
        font: function (context) {
          var avgSize = Math.round(
            (context.chart.height + context.chart.width) / 2
          );
          var size = Math.round(avgSize / 24);
          size = size > 18 ? 18 : size; // setting max limit to 18
          return {
            size: size,
            weight: "bolder",
          };
        },
      },
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const DailyTemperature = React.memo((props) => {
  const labelData = props.daily.map((daily) => daily.timestamp);
  const chartData = props.daily.map((daily) => daily.temp);

  const data = {
    labels: labelData,
    datasets: [
      {
        label: "",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(16,12,8,0.2)",
        borderColor: "white",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData,
      },
    ],
  };

  return (
    <div className={classes["daily-chart"]}>
      <FadeIn>
        <p>Next 7 Days Weather</p>
      </FadeIn>
      <div className={classes["chart-wrapper"]}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
});
export default DailyTemperature;
