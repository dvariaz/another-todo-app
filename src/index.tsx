import React from "react";
import ReactDOM from "react-dom";

// Styles
import "@styles/app.scss";
import "./index.css";

// Components
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
