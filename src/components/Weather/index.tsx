import React, { FC, useEffect, useState } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { useObserver } from "mobx-react";

import useStore from "hooks/useStore";

import Forecast from "components/Weather/Forecast";
import WeatherIcon from "components/Weather/WeatherIcon";
import Loader from "components/Weather/Loader";

import calculateTemperature from "utils/calculateTemperature";

import { ReactComponent as AngleUp } from "images/angle-up.svg";

const CurrentWeatherContainer = styled.div``;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 20px;
  border-bottom: 1px solid #e1e1e1;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
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
  user-select: none;
`;

const WeatherOptionWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 20px;
  border-top: 1px solid #e1e1e1;
`;

interface IWeatherOptionTextProps {
  selected?: boolean;
}
const WeatherOptionText = styled(Text)<IWeatherOptionTextProps>`
  cursor: pointer;

  ${({ selected }): FlattenSimpleInterpolation =>
    selected
      ? css`
          color: black;
          font-weight: 700;
        `
      : css`
          color: darkgray;
        `};
`;

interface IAngleUpIconProps {
  open?: boolean;
}
const AngleUpIcon = styled(AngleUp)<IAngleUpIconProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  margin-top: -9px;
  margin-left: -9px;
  transition: transform 0.2s linear;

  ${({ open }): FlattenSimpleInterpolation =>
    open
      ? css`
          cursor: pointer;
        `
      : css`
          transform: rotate(180deg);
          fill: #e1e1e1;
        `}
`;

const useCurrentWeatherData = () => {
  const { weatherStore } = useStore();

  return useObserver(() => ({
    isOpenForecast: weatherStore.isOpenForecast,
    weatherOption: weatherStore.weatherOption,
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
    r2: weatherStore.r2,
    r3: weatherStore.r3,
    hour: weatherStore.hour,
    isLoaded: weatherStore.isLoaded,
    setWeatherOption: weatherStore.setWeatherOption,
    getCurrentWeather: weatherStore.getCurrentWeather,
  }));
};

const CurrentWeather: FC = () => {
  const [isOpenForecast, setIsOpenForecast] = useState<boolean>(false);
  const {
    weatherOption,
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
    r2,
    r3,
    hour,
    isLoaded,
    getCurrentWeather,
    setWeatherOption,
  } = useCurrentWeatherData();

  useEffect(() => {
    getCurrentWeather();
  }, [getCurrentWeather]);

  const handleSelectWeatherOption = (e: React.SyntheticEvent<HTMLElement, MouseEvent>): void => {
    const { value } = e.currentTarget.dataset;

    if (value) {
      setWeatherOption(value || null);
      setIsOpenForecast(true);

      if (value === weatherOption) {
        setIsOpenForecast(false);
      }
    }
  };

  const onClickCloseForecast = () => {
    if (weatherOption && isOpenForecast) {
      setIsOpenForecast(false);
    }
  };

  const handleTransitionEnd = () => {
    if (weatherOption && !isOpenForecast) {
      setWeatherOption(null);
      setIsOpenForecast(false);
    }
  };

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
        {isLoaded ? (
          <>
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
                    <Text weight="700">{calculateTemperature(temp, yesterdayTemp)}°C</Text>
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
                  {pm10}pm
                </Text>
                <Text color="gray" margin="0 8px 0 0">
                  초미세먼지
                </Text>
                <Text weight="700">{pm25}pm</Text>
              </Row>
            </WeatherInfoWrapper>
          </>
        ) : (
          <Loader />
        )}
      </ContentWrapper>
      <WeatherOptionWrapper>
        <WeatherOptionText
          data-value="tomorrow"
          selected={weatherOption === "tomorrow"}
          onClick={handleSelectWeatherOption}
        >
          내일
        </WeatherOptionText>
        <AngleUpIcon open={weatherOption !== null} onClick={onClickCloseForecast} />
        <Row>
          <WeatherOptionText
            data-value="temp"
            selected={weatherOption === "temp"}
            margin="0 10px 0 0"
            onClick={handleSelectWeatherOption}
          >
            기온
          </WeatherOptionText>
          <WeatherOptionText
            data-value="rain"
            selected={weatherOption === "rain"}
            margin="0 10px 0 0"
            onClick={handleSelectWeatherOption}
          >
            강수
          </WeatherOptionText>
          <WeatherOptionText
            data-value="humid"
            selected={weatherOption === "humid"}
            onClick={handleSelectWeatherOption}
          >
            습도
          </WeatherOptionText>
        </Row>
      </WeatherOptionWrapper>
      {weatherOption && <Forecast isOpenForecast={isOpenForecast} handleTransitionEnd={handleTransitionEnd} />}
    </CurrentWeatherContainer>
  );
};

export default CurrentWeather;
