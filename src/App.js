import React from "react";
import { GLOBAL_STATE_CONTEXT } from "./store";

const App = () => {
  const { THEME, SET_THEME, LANG, SET_LANG } = React.useContext(GLOBAL_STATE_CONTEXT);
  return (
    <div>
      <p>{LANG["test"]}</p>

      <div>
        <button onClick={() => SET_THEME("light")}>light</button>
        <button onClick={() => SET_THEME("dark")}>dark</button>
      </div>

      <div>
        <button onClick={() => SET_LANG("zh")}>zh</button>
        <button onClick={() => SET_LANG("en")}>en</button>
      </div>
      <style jsx>{`
        p {
          color: ${THEME.color};
        }
      `}</style>
      <style jsx global>{`
        body {
          background-color: ${THEME.backgroundColor};
        }
      `}</style>
    </div>
  );
};

export default App;
