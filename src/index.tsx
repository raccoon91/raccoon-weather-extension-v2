import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "App";
import GlobalStyle from "style/global";
import Store from "stores";

const store = new Store();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider weatherStore={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
