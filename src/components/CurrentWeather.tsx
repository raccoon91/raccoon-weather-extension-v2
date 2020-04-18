import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import publicIp from "public-ip";

import requestWeatherServer from "../lib/requestWeatherServer";

import { ReactComponent as Sun } from "../images/day.svg";

const CurrentWeatherContainer = styled.div`
  padding: 20px;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  transform: scale(1.5);

  svg {
    width: 180px;
    height: 180px;
  }
`;

const WeatherInfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 180px;
  padding-left: 40px;
`;

interface IRowProps {
  marginTop?: string;
}
const Row = styled.div<IRowProps>`
  display: flex;
  margin-top: ${({ marginTop }): string | null => marginTop || null};
`;

interface ITextProps {
  padding?: string;
  margin?: string;
  color?: string;
  size?: string;
  weight?: string;
}
const Text = styled.p<ITextProps>`
  padding: ${({ padding }): string | null => padding || null};
  margin: ${({ margin }): string | null => margin || null};
  color: ${({ color }): string => color || "black"};
  font-size: ${({ size }): string => size || "18px"};
  font-weight: ${({ weight }): string => weight || "400"};
`;

const Bold = styled.span`
  font-weight: 700;
`;

const WeatherOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid black;
`;

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

const CurrentWeather: FC = () => {
  const [weather, setWeather] = useState<IWeather>({});
  const [location, setLocation] = useState<ILocation>({});

  const getCurrentWeather = async () => {
    try {
      const ip = await publicIp.v4();
      const response = await requestWeatherServer({
        method: "get",
        url: "weather",
        params: {
          ip,
        },
      });

      const { weather, location } = response.data;

      console.log("weather", weather);
      console.log("location", location);

      setWeather(weather);
      setLocation(location);
    } catch (error) {
      console.error(`[current weather request FAIL][${error.message}]`);
      console.error(error.stack);
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  return (
    <CurrentWeatherContainer>
      <LocationWrapper>
        <Text weight="700" margin="0 8px 0 0">
          {location.city}
        </Text>
        <Text weight="700" margin="0 8px 0 0">
          {location.r2}
        </Text>
        <Text weight="700">{location.r3}</Text>
      </LocationWrapper>
      <ContentWrapper>
        <ImageWrapper>
          <Sun />
        </ImageWrapper>
        <WeatherInfoWrapper>
          <Text size="36px" weight="700">
            {weather.city}
          </Text>
          <Row marginTop="10px">
            <Text>
              기온 <Bold>{weather.temp}°</Bold>C
            </Text>
            {weather.temp && weather.yesterday_temp && (
              <Text>
                어제보다 <Bold>{weather.temp - weather.yesterday_temp}°C</Bold>
              </Text>
            )}
          </Row>
          <Row marginTop="8px">
            <Text margin="0 8px 0 0">
              강수 확률 <Bold>{weather.pop}%</Bold>
            </Text>
            <Text>
              강수량 <Bold>{weather.rn1}mm</Bold>
            </Text>
          </Row>
          <Text margin="8px 0 0">
            습도 <Bold>{weather.humidity}%</Bold>
          </Text>
          <Row marginTop="8px">
            <Text margin="0 8px 0 0">미세먼지 {weather.pm10}</Text>
            <Text>초미세먼지 {weather.pm25}</Text>
          </Row>
        </WeatherInfoWrapper>
      </ContentWrapper>
      <WeatherOptionWrapper>
        <Text margin="0 8px 0 0">기온</Text>
        <Text margin="0 8px 0 0">강수</Text>
        <Text>습도</Text>
      </WeatherOptionWrapper>
    </CurrentWeatherContainer>
  );
};

export default CurrentWeather;
