import React, { FC } from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";

import useStore from "../hooks/useStore";

import WeatherIcon from "./WeatherIcon";

const ForecastContainer = styled.div`
  width: 100%;
  min-height: 180px;
  border-top: 1px solid #e1e1e1;
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

const CustomizedAxisTick = (props: XAxisProps): JSX.Element => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={16} y={0} dy={16} textAnchor="end" fill="#666">
        {payload && payload.value}시
      </text>
    </g>
  );
};

interface IForecastProps {
  option: string;
}
const Forecast: FC<IForecastProps> = ({ option }) => {
  const {
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

  const categoryList = option === "tomorrow" ? tomorrowCategories : categories;
  const conditionList = option === "tomorrow" ? tomorrowCondition : condition;
  const forecastLineColor = option === "temp" ? "#2ECC40" : option === "rain" ? "#0074D9" : "#AAAAAA";

  const forecastData = categoryList.map((hour: string, index: number) => {
    const data: { name: string; value?: number; temp?: number; rain?: number; humid?: number } = { name: hour };

    if (option === "tomorrow") {
      data.temp = tomorrowTempData[index];
      data.rain = tomorrowRainProbData[index];
      data.humid = tomorrowHumidityData[index];
    } else if (option === "rain") {
      data.value = rainProbData[index];
    } else if (option === "humid") {
      data.value = humidityData[index];
    } else {
      data.value = tempData[index];
    }

    return data;
  });

  return (
    <ForecastContainer>
      <LineChart width={500} height={180} data={forecastData} margin={{ top: 24, right: 24, left: 24 }}>
        <XAxis dataKey="name" axisLine={false} tick={<CustomizedAxisTick />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />

        {option === "tomorrow" && (
          <Line type="monotone" dataKey="temp" stroke="#2ECC40" activeDot={{ r: 8 }} animationDuration={500} />
        )}
        {option === "tomorrow" && (
          <Line type="monotone" dataKey="rain" stroke="#0074D9" activeDot={{ r: 8 }} animationDuration={500} />
        )}
        {option === "tomorrow" && (
          <Line type="monotone" dataKey="humid" stroke="#AAAAAA" activeDot={{ r: 8 }} animationDuration={500} />
        )}
        {option !== "tomorrow" && (
          <Line
            type="monotone"
            dataKey="value"
            stroke={forecastLineColor}
            activeDot={{ r: 8 }}
            animationDuration={500}
          />
        )}
      </LineChart>
      <WeatherIconWrapper>
        {conditionList.map((condition: number[], index: number) => {
          const [sky, pty] = condition;

          return <WeatherIcon key={index} sky={sky} pty={pty} hour={categories[index]} size="48px" />;
        })}
      </WeatherIconWrapper>
    </ForecastContainer>
  );
};

export default Forecast;
