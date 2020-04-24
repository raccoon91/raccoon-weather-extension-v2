import React, { FC, useState, useEffect } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { useObserver } from "mobx-react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";

import useStore from "hooks/useStore";

import WeatherIcon from "components/Weather/WeatherIcon";

interface IForecastContainerProps {
  expand?: boolean;
}
const ForecastContainer = styled.div<IForecastContainerProps>`
  overflow: hidden;
  width: 100%;
  border-top: 1px solid #e1e1e1;
  transition: height 0.2s linear;

  ${({ expand }): FlattenSimpleInterpolation =>
    expand
      ? css`
          height: 230px;
        `
      : css`
          height: 0;
        `}
`;

const WeatherIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
`;

const useForecastData = () => {
  const { weatherStore } = useStore();

  return useObserver(() => ({
    weatherOption: weatherStore.weatherOption,
    categories: weatherStore.categories,
    rainProbData: weatherStore.rainProbData,
    humidityData: weatherStore.humidityData,
    tempData: weatherStore.tempData,
    condition: weatherStore.condition,
    tomorrowCategories: weatherStore.tomorrowCategories,
    tomorrowRainProbData: weatherStore.tomorrowRainProbData,
    tomorrowHumidityData: weatherStore.tomorrowHumidityData,
    tomorrowTempData: weatherStore.tomorrowTempData,
    tomorrowCondition: weatherStore.tomorrowCondition,
  }));
};

interface XAxisProps {
  textAnchor?: string;
  verticalAnchor?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  stroke?: string;
  fill?: string;
  index?: number;
  payload?: {
    coordinate?: number;
    value?: string;
    index?: number;
    offset?: number;
    tickCoord?: number;
    isShow?: boolean;
  };
}

const tooltipDictionary: { [key: string]: { name: string; unit: string } } = {
  temp: { name: "온도", unit: "°C" },
  rain: { name: "강수 확률", unit: "%" },
  humid: { name: "습도", unit: "%" },
};

const CustomizedAxisTick = (props: XAxisProps): JSX.Element => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={16} y={0} dy={16} textAnchor="end" fill="#666">
        {payload && payload.value}
      </text>
    </g>
  );
};

interface IForecastProps {
  isOpenForecast?: boolean;
  handleTransitionEnd: () => void;
}
const Forecast: FC<IForecastProps> = ({ isOpenForecast, handleTransitionEnd }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const {
    weatherOption,
    categories,
    rainProbData,
    humidityData,
    tempData,
    condition,
    tomorrowCategories,
    tomorrowRainProbData,
    tomorrowHumidityData,
    tomorrowTempData,
    tomorrowCondition,
  } = useForecastData();

  const categoryList = weatherOption === "tomorrow" ? tomorrowCategories : categories;
  const conditionList = weatherOption === "tomorrow" ? tomorrowCondition : condition;
  const forecastLineColor = weatherOption === "temp" ? "#2ECC40" : weatherOption === "rain" ? "#0074D9" : "#AAAAAA";

  const forecastData = categoryList.map((hour: string, index: number) => {
    const data: { name: string; value?: number; temp?: number; rain?: number; humid?: number } = { name: `${hour}시` };

    if (weatherOption === "tomorrow") {
      data.temp = tomorrowTempData[index];
      data.rain = tomorrowRainProbData[index];
      data.humid = tomorrowHumidityData[index];
    } else if (weatherOption === "rain") {
      data.rain = rainProbData[index];
    } else if (weatherOption === "humid") {
      data.humid = humidityData[index];
    } else {
      data.temp = tempData[index];
    }

    return data;
  });

  useEffect(() => {
    if (isOpenForecast) {
      setTimeout(() => {
        setExpand(true);
      }, 200);
    } else {
      setExpand(false);
    }
  }, [isOpenForecast]);

  return (
    <ForecastContainer expand={expand} onTransitionEnd={handleTransitionEnd}>
      <LineChart width={500} height={180} data={forecastData} margin={{ top: 24, right: 24, left: 24 }}>
        <XAxis dataKey="name" axisLine={false} tick={<CustomizedAxisTick />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          formatter={(value, name) => {
            return [`${value}${tooltipDictionary[name].unit}`, tooltipDictionary[name].name];
          }}
        />

        {weatherOption === "tomorrow" && (
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#2ECC40"
            strokeWidth={2.5}
            activeDot={{ r: 8 }}
            animationDuration={500}
          />
        )}
        {weatherOption === "tomorrow" && (
          <Line
            type="monotone"
            dataKey="rain"
            stroke="#0074D9"
            strokeWidth={2.5}
            activeDot={{ r: 8 }}
            animationDuration={500}
          />
        )}
        {weatherOption === "tomorrow" && (
          <Line
            type="monotone"
            dataKey="humid"
            stroke="#AAAAAA"
            strokeWidth={2.5}
            activeDot={{ r: 8 }}
            animationDuration={500}
          />
        )}
        {weatherOption !== "tomorrow" && (
          <Line
            type="monotone"
            dataKey={weatherOption}
            stroke={forecastLineColor}
            strokeWidth={2.5}
            activeDot={{ r: 8 }}
            animationDuration={500}
          />
        )}
      </LineChart>
      <WeatherIconWrapper>
        {conditionList.map((condition: number[], index: number) => {
          const [sky, pty] = condition;

          return <WeatherIcon key={index} sky={sky} pty={pty} hour={categoryList[index]} size="48px" />;
        })}
      </WeatherIconWrapper>
    </ForecastContainer>
  );
};

export default Forecast;
