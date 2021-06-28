import { useState } from "react";

import "./App.css";

import Card from "./components/UI/Card";
import CurrentWeather from "./components/Weather/CurrentWeather/CurrentWeather";
import DailyTemperatureChart from "./components/Weather/DailyTemperatureChart/DailyTemperatureChart";
import DailyHumidity from "./components/Weather/DailyHumidity/DailyHumidity";

function App() {
  const [current, setCurrent] = useState();
  const [daily, setDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const message = (
    <div className="message">
      <p>Enter city name to see weather 🌤</p>
    </div>
  );

  return (
    <Card className="card">
      <div className="weather">
        <CurrentWeather
          current={current}
          fetchCurrent={setCurrent}
          fetchDaily={setDaily}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {daily.length > 0 ? <DailyTemperatureChart daily={daily} /> : message}
      </div>
      {daily.length > 0 && <DailyHumidity daily={daily} />}
    </Card>
  );
}

export default App;
