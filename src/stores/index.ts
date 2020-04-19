import { observable, action, runInAction } from "mobx";
import publicIp from "public-ip";
import requestWeatherServer from "../lib/requestWeatherServer";
import { AxiosResponse } from "axios";

interface IWeather {
  city: string; // 도시
  temp: number; // 온도
  yesterday_temp: number; // 어제 온도
  sky: number; // 하늘 상태
  pty: number; // 강수 형태
  pop: number; // 강수 확률
  rn1: number; // 강수량
  humidity: number; // 습도
  pm10: string; // 미세먼지
  pm25: string; // 초미세먼지
  hour: string; // 날씨 시간
  weather_date: string; // 날씨 날짜
}

interface ILocation {
  ip: string; // 아피
  city: string; // 도시
  country: string; // 국가코드
  code: string;
  r1: string; // 시
  r2: string; // 구
  r3: string; // 동
  lat: number;
  long: number;
  net: string;
}

class Store {
  @observable public city: string = "";
  @observable public temp: number = 0;
  @observable public yesterdayTemp: number = 0;
  @observable public sky: number = 0;
  @observable public pty: number = 0;
  @observable public pop: number = 0;
  @observable public rn1: number = 0;
  @observable public humidity: number = 0;
  @observable public pm10: string = "";
  @observable public pm25: string = "";
  @observable public hour: string = "";
  @observable public r1: string = "";
  @observable public r2: string = "";
  @observable public r3: string = "";

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

      if (!weather || !location) throw new Error("empty data");

      const { city, temp, yesterday_temp: yesterdayTemp, sky, pty, pop, rn1, humidity, pm10, pm25, hour } = weather;
      const { r1, r2, r3 } = location;

      runInAction(() => {
        this.city = city;
        this.temp = temp;
        this.yesterdayTemp = yesterdayTemp;
        this.sky = sky;
        this.pty = pty;
        this.pop = pop;
        this.rn1 = rn1;
        this.humidity = humidity;
        this.pm10 = pm10;
        this.pm25 = pm25;
        this.r1 = r1;
        this.r2 = r2;
        this.r3 = r3;
        this.hour = hour;
      });
    } catch (error) {
      console.error(`[current weather request FAIL][${error.message}]`);
      console.error(error.stack);
    }
  };
}

export default Store;
