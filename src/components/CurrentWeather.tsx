import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react";

import useStore from "../hooks/useStore";

import WeatherIcon from "./WeatherIcon";

const CurrentWeatherContainer = styled.div`
  padding: 20px;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
`;

const ContentWrapper = styled.div`
  display: flex;
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
  align-items: center;
  margin-top: ${({ marginTop }): string | null => marginTop || null};
`;

interface ITextProps {
  padding?: string;
  margin?: string;
  color?: string;
  size?: string;
  weight?: string;
}
const Text = styled.span<ITextProps>`
  height: ${({ size }): string => size || "18px"};
  padding: ${({ padding }): string | null => padding || null};
  margin: ${({ margin }): string | null => margin || null};
  color: ${({ color }): string => color || "black"};
  font-size: ${({ size }): string => size || "18px"};
  font-weight: ${({ weight }): string => weight || "400"};
  line-height: ${({ size }): string => size || "18px"};
`;

const WeatherOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding-top: 20px;
  border-top: 1px solid black;
`;

const useCurrentWeatherData = () => {
  const { weatherStore } = useStore();

  return useObserver(() => ({
    getCurrentWeather: weatherStore.getCurrentWeather,
    city: weatherStore.city,
    temp: weatherStore.temp,
    yesterdayTemp: weatherStore.yesterdayTemp,
    sky: weatherStore.sky,
    pty: weatherStore.pty,
    pop: weatherStore.pop,
    rn1: weatherStore.rn1,
    humidity: weatherStore.humidity,
    pm10: weatherStore.pm10,
    pm25: weatherStore.pm25,
    r1: weatherStore.r1,
    r2: weatherStore.r2,
    r3: weatherStore.r3,
    hour: weatherStore.hour,
  }));
};

const CurrentWeather: FC = () => {
  const {
    getCurrentWeather,
    city,
    temp,
    yesterdayTemp,
    sky,
    pty,
    pop,
    rn1,
    humidity,
    pm10,
    pm25,
    r1,
    r2,
    r3,
    hour,
  } = useCurrentWeatherData();

  useEffect(() => {
    getCurrentWeather();
  }, [getCurrentWeather]);

  console.log("render");

  return (
    <CurrentWeatherContainer>
      <LocationWrapper>
        <Text weight="700" margin="0 10px 0 0">
          {city}
        </Text>
        <Text weight="700" margin="0 10px 0 0">
          {r2}
        </Text>
        <Text weight="700">{r3}</Text>
      </LocationWrapper>
      <ContentWrapper>
        <WeatherIcon sky={sky} pty={pty} hour={hour} size="180px" />
        <WeatherInfoWrapper>
          <Row>
            <Text size="36px" weight="700">
              {city}
            </Text>
          </Row>
          <Row marginTop="10px">
            <Text color="gray" margin="0 8px 0 0">
              기온
            </Text>
            <Text margin="0 10px 0 0" weight="700">
              {temp}°C
            </Text>
            {temp && yesterdayTemp && (
              <Row>
                <Text color="gray" margin="0 8px 0 0">
                  어제보다
                </Text>
                <Text weight="700">{(temp - yesterdayTemp).toFixed(1)}°C</Text>
              </Row>
            )}
          </Row>
          <Row marginTop="8px">
            <Text color="gray" margin="0 8px 0 0">
              강수 확률
            </Text>
            <Text margin="0 10px 0 0" weight="700">
              {pop}%
            </Text>
            <Text color="gray" margin="0 8px 0 0">
              강수량
            </Text>
            <Text weight="700">{rn1}mm</Text>
          </Row>
          <Row marginTop="8px">
            <Text color="gray" margin="0 8px 0 0">
              습도
            </Text>
            <Text weight="700">{humidity}%</Text>
          </Row>
          <Row marginTop="8px">
            <Text color="gray" margin="0 8px 0 0">
              미세먼지
            </Text>
            <Text margin="0 10px 0 0" weight="700">
              {pm10}
            </Text>
            <Text color="gray" margin="0 8px 0 0">
              초미세먼지
            </Text>
            <Text weight="700">{pm25}</Text>
          </Row>
        </WeatherInfoWrapper>
      </ContentWrapper>
      <WeatherOptionWrapper>
        <Row>
          <Text margin="0 10px 0 0">기온</Text>
          <Text margin="0 10px 0 0">강수</Text>
          <Text>습도</Text>
        </Row>
      </WeatherOptionWrapper>
    </CurrentWeatherContainer>
  );
};

export default CurrentWeather;
