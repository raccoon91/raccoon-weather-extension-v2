import React, { FC } from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import useStore from "../hooks/useStore";

import WeatherIcon from "./WeatherIcon";

const ForecastContainer = styled.div`
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
`;

const WeatherIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const useForecastData = () => {
  const { weatherStore } = useStore();

  return useObserver(() => ({
    categories: weatherStore.categories,
    rainProbData: weatherStore.rainProbData,
    humidityData: weatherStore.humidityData,
    tempData: weatherStore.tempData,
    condition: weatherStore.condition,
  }));
};

const CustomizedAxisTick = ({ x, y, payload }: any): JSX.Element => {
  const { value } = payload;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={16} y={0} dy={16} textAnchor="end" fill="#666">
        {value}시
      </text>
    </g>
  );
};

interface IForecastProps {
  option: string;
}
const Forecast: FC<IForecastProps> = ({ option }) => {
  const { categories, rainProbData, humidityData, tempData, condition } = useForecastData();

  const forecastData = categories.map((hour: string, index: number) => {
    const data: { name: string; value?: number } = { name: hour };

    if (option === "temp") {
      data.value = tempData[index];
    } else if (option === "rain") {
      data.value = rainProbData[index];
    } else {
      data.value = humidityData[index];
    }

    return data;
  });

  return (
    <ForecastContainer>
      <LineChart width={500} height={180} data={forecastData} margin={{ top: 5, right: 24, left: 24 }}>
        <XAxis dataKey="name" axisLine={false} tick={<CustomizedAxisTick />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} animationDuration={500} />
      </LineChart>
      <WeatherIconWrapper>
        {condition.map((weatherCondition: number[], index: number) => {
          const [sky, pty] = weatherCondition;

          return <WeatherIcon key={index} sky={sky} pty={pty} hour={categories[index]} size="48px" />;
        })}
      </WeatherIconWrapper>
    </ForecastContainer>
  );
};

export default Forecast;
