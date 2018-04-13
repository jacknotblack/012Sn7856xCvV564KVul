import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import "./index.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";
import { store, history } from "./stores";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
