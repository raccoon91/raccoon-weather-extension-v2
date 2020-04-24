import React, { FC } from "react";
import styled from "styled-components";

import { ReactComponent as Good } from "images/symbol/good.svg";
import { ReactComponent as Nice } from "images/symbol/nice.svg";
import { ReactComponent as Bad } from "images/symbol/bad.svg";
import { ReactComponent as Terrible } from "images/symbol/terrible.svg";

const pollutionColor: {
  [key: string]: string;
} = {
  good: "#0b71fc",
  nice: "#58b108",
  bad: "#e9b619",
  terrible: "#fc610b",
};

const AirPollutionContainer = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

interface IAirPollutionAmountProps {
  color: string;
}
const AirPollutionAmount = styled.p<IAirPollutionAmountProps>`
  color: ${({ color }): string => color};
`;

interface IAirPollutionProps {
  category: string;
  amount: string;
}
const AirPollution: FC<IAirPollutionProps> = ({ category, amount }) => {
  let status;
  const amountNum = Number(amount);

  if (category === "pm10") {
    if (amountNum <= 30) status = "good";
    else if (amountNum <= 80) status = "nice";
    else if (amountNum <= 150) status = "bad";
    else status = "terrible";
  } else {
    if (amountNum <= 15) status = "good";
    else if (amountNum <= 35) status = "nice";
    else if (amountNum <= 75) status = "bad";
    else status = "terrible";
  }

  return (
    <AirPollutionContainer>
      <IconWrapper>
        {status === "good" && <Good />}
        {status === "nice" && <Nice />}
        {status === "bad" && <Bad />}
        {status === "terrible" && <Terrible />}
      </IconWrapper>
      <AirPollutionAmount color={pollutionColor[status]}>{amount}pm</AirPollutionAmount>
    </AirPollutionContainer>
  );
};

export default AirPollution;
