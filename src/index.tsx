import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Styles
import "@styles/app.scss";
import "./index.css";

// Components
import App from "./App";

// Store
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
