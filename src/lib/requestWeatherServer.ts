import axios, { AxiosInstance } from "axios";
import config from "config";

const BASE_URL = config.RACCOON_WEATHER_SERVER_URL;

const requestWeatherServer: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default requestWeatherServer;
