import React, { FC } from "react";
import styled from "styled-components";

import Weather from "components/Weather";

const AppContainer = styled.div`
  width: 500px;
  min-height: 300px;
`;

const App: FC = () => {
  return (
    <AppContainer>
      <Weather />
    </AppContainer>
  );
};

export default App;
