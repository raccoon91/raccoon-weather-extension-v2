import React, { FC } from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  width: 220px;
  height: 130px;
`;

const BallWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  margin: 0 10px;
  padding-bottom: 10px;
`;

const BallHolder = styled.div`
  position: relative;
  overflow: hidden;
  height: 130px;
`;

interface IBallProps {
  delay: string;
}
const Ball = styled.div<IBallProps>`
  position: absolute;
  bottom: 0;
  left: 50%;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  border: 1px solid #57a0ee;
  background-color: #57a0ee;
  transform: translateY(0px) translateX(-50%) translateZ(0);
  transform-origin: center;
  animation: bounce 0.7s infinite linear;
  animation-delay: ${({ delay }): string => delay};
  z-index: 2;

  @keyframes bounce {
    0% {
      transform: translate(-50%, 10px);
    }
    40% {
      transform: translate(-50%, -90px);
      width: 30px;
      height: 30px;
    }
    50% {
      transform: translate(-50%, -100px);
      width: 30px;
      height: 30px;
    }
    65% {
      transform: translate(-50%, -90px);
      width: 30px;
      height: 30px;
    }
    75% {
      transform: translate(-50%, 0px);
      width: 30px;
      height: 30px;
    }
    100% {
      transform: translate(-50%, 10px);
      width: 50px;
      height: 15px;
    }
  }
`;

interface IShadowProps {
  delay: string;
}
const Shadow = styled.div<IShadowProps>`
  position: absolute;
  bottom: 9px;
  width: 100%;
  height: 6px;
  border-radius: 50%;
  background: rgb(161, 160, 161);
  opacity: 1;
  animation: expand 0.7s infinite linear;
  animation-delay: ${({ delay }): string => delay};
  z-index: 1;

  @keyframes expand {
    0% {
      transform: scale(0.9, 0.9);
      opacity: 1;
    }
    50% {
      transform: scale(0.2, 0.2);
      opacity: 0.3;
    }
    100% {
      transform: scale(0.9, 0.9);
      opacity: 1;
    }
  }
`;

const Loader: FC = () => {
  return (
    <LoaderContainer>
      <BallWrapper>
        <BallHolder>
          <Ball delay="0s" />
        </BallHolder>
        <Shadow delay="0s" />
      </BallWrapper>
      <BallWrapper>
        <BallHolder>
          <Ball delay="0.2s" />
        </BallHolder>
        <Shadow delay="0.2s" />
      </BallWrapper>
      <BallWrapper>
        <BallHolder>
          <Ball delay="0.3s" />
        </BallHolder>
        <Shadow delay="0.3s" />
      </BallWrapper>
    </LoaderContainer>
  );
};

export default Loader;
