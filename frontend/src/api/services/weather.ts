import { api } from "../axios";
import axios from "axios";
import { WeatherData } from "../../types/weather";

/* interface WeatherData {
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
} */

const weatherApi = {
  getWeatherByCity: (city: string): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return axios
      .get<WeatherData>(url)
      .then((response) => response.data)  
      .catch((error) => {
        throw new Error(error.response ? error.response.data.message : "Failed to fetch weather data");
      });
  },
};

/* export const weatherApi = { getWeatherByCity: (city: string): Promise =>{
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VITE_OPENWEATHER_API_KEY}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    });
} }; */

export default weatherApi;