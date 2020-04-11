import React, { FC } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const App: FC = () => {
  return <AppContainer>Raccoon Weather V2</AppContainer>;
};

export default App;
