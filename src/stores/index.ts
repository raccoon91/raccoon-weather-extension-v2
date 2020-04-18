import { observable, action, runInAction } from "mobx";
import publicIp from "public-ip";
import requestWeatherServer from "../lib/requestWeatherServer";
import { AxiosResponse } from "axios";

interface IWeather {
  city?: string;
  temp?: number;
  yesterday_temp?: number;
  sky?: number;
  pty?: number;
  pop?: number;
  rn1?: number;
  humidity?: number;
  pm10?: string;
  pm25?: string;
  hour?: string;
  weather_date?: string;
}

interface ILocation {
  ip?: string;
  city?: string;
  country?: string;
  code?: string;
  r1?: string;
  r2?: string;
  r3?: string;
  lat?: number;
  long?: number;
  net?: string;
}

class Store {
  @observable weather: IWeather = {};
  @observable location: ILocation = {};

  @action
  getCurrentWeather = async () => {
    try {
      const ip = await publicIp.v4();
      const response: AxiosResponse<{ weather: IWeather; location: ILocation }> = await requestWeatherServer({
        method: "get",
        url: "weather",
        params: {
          ip,
        },
      });

      const { weather, location } = response.data;

      runInAction(() => {
        this.weather = weather;
        this.location = location;
      });
    } catch (error) {
      console.error(`[current weather request FAIL][${error.message}]`);
      console.error(error.stack);
    }
  };
}

export default Store;
