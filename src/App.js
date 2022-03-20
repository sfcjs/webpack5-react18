import React from "react";
import { GLOBAL_STATE_CONTEXT } from "./store";

const App = () => {
  const { THEME, SET_THEME, LANG, SET_LANG } = React.useContext(GLOBAL_STATE_CONTEXT);
  console.log("🚀 ~ file: App.js ~ line 6 ~ App ~ THEME", THEME);

  return (
    <div className="container">
      <h1>{LANG["test"]}</h1>
      <div>
        <button onClick={() => SET_THEME("light")}>light</button>
        <button onClick={() => SET_THEME("dark")}>dark</button>
      </div>

      <div>
        <button onClick={() => SET_LANG("zh")}>zh</button>
        <button onClick={() => SET_LANG("en")}>en</button>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        h1 {
          color: ${THEME.color};
        }
        button {
          width: 100px;
          margin: 15px;
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
