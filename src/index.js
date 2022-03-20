import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { GLOBAL_STATE_PROVIDER } from "./store";

const root = document.getElementById("root");
const ReactApp = ReactDOM.createRoot(root);

ReactApp.render(
  <GLOBAL_STATE_PROVIDER>
    <App />
  </GLOBAL_STATE_PROVIDER>
);
