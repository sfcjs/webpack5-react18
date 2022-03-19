import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { GLOBAL_STATE_PROVIDER } from "./store";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <GLOBAL_STATE_PROVIDER>
    <App />
  </GLOBAL_STATE_PROVIDER>
);
