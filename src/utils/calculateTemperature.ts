const calculateTemperature = (current: number, yesterday: number): string => {
  const temperature = current - yesterday;

  return temperature >= 0 ? `+${temperature.toFixed(1)}` : `${temperature.toFixed(1)}`;
};

export default calculateTemperature;
