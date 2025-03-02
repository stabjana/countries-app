/* 
Displays current weather data
Shows temperature, humidity, wind speed
Weather condition icon and description
Handles loading and error states
 */
// import { WeatherData } from "../../api/services/weather"; // Import WeatherData type from the api
import { WeatherData } from "../../types/weather";

interface WeatherInfoProps {
  weather?: WeatherData | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  if (!weather) {
    return <h3>Loading weather info...</h3>;
  }
  return (
    <div className="weather-info">
      <h3>How is the weather in that place?</h3>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Description: {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
};

export default WeatherInfo;
