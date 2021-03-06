import React, { FC } from "react";
import styled from "styled-components";

import getWeatherCondition from "utils/getWeatherCondition";

import { ReactComponent as ClearDay } from "images/weather/clear-day.svg";
import { ReactComponent as ClearNight } from "images/weather/clear-night.svg";
import { ReactComponent as CloudyDay } from "images/weather/cloudy-day.svg";
import { ReactComponent as CloudyNight } from "images/weather/cloudy-night.svg";
import { ReactComponent as Foggy } from "images/weather/foggy.svg";
import { ReactComponent as RainyDay } from "images/weather/rainy-day.svg";
import { ReactComponent as RainyNight } from "images/weather/rainy-night.svg";
import { ReactComponent as ShowerDay } from "images/weather/shower-day.svg";
import { ReactComponent as ShowerNight } from "images/weather/shower-night.svg";
import { ReactComponent as SnowyDay } from "images/weather/snowy-day.svg";
import { ReactComponent as SnowNight } from "images/weather/snowy-night.svg";

interface IWeatherIconContainerProps {
  size?: string;
}
const WeatherIconContainer = styled.div<IWeatherIconContainerProps>`
  width: ${({ size }): string => size || "64px"};
  height: ${({ size }): string => size || "64px"};
  transform: scale(1.5);
  pointer-events: none;

  svg {
    width: ${({ size }): string => size || "64px"};
    height: ${({ size }): string => size || "64px"};
  }
`;

interface IWeatherIconProps {
  sky: number;
  pty: number;
  hour: string;
  size?: string;
}
const WeatherIcon: FC<IWeatherIconProps> = ({ sky, pty, hour, size }) => {
  const weatherCondition = getWeatherCondition(sky, pty, Number(hour));

  return (
    <WeatherIconContainer size={size}>
      {weatherCondition === "clear-day" && <ClearDay />}
      {weatherCondition === "clear-night" && <ClearNight />}
      {weatherCondition === "cloudy-day" && <CloudyDay />}
      {weatherCondition === "cloudy-night" && <CloudyNight />}
      {weatherCondition === "foggy" && <Foggy />}
      {weatherCondition === "rainy-day" && <RainyDay />}
      {weatherCondition === "rainy-night" && <RainyNight />}
      {weatherCondition === "shower-day" && <ShowerDay />}
      {weatherCondition === "shower-night" && <ShowerNight />}
      {weatherCondition === "snowy-day" && <SnowyDay />}
      {weatherCondition === "snowy-night" && <SnowNight />}
    </WeatherIconContainer>
  );
};

export default WeatherIcon;
