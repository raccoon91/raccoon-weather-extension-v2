const getWeatherCondition = (sky: number, pty: number, hour: number): string => {
  const hourCondition = hour >= 6 && hour < 18 ? "day" : "night";

  if (sky + pty === 0) return "";

  if (pty === 1 || pty === 2) {
    return `rainy-${hourCondition}`;
  } else if (pty === 3) {
    return `snowy-${hourCondition}`;
  } else if (pty === 4) {
    return `shower-${hourCondition}`;
  }

  if (sky === 2 || sky === 3) {
    return `cloudy-${hourCondition}`;
  } else if (sky === 4) {
    return "foggy";
  }

  return `clear-${hourCondition}`;
};

export default getWeatherCondition;
