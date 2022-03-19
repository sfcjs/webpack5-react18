import React from "react";
import theme from "./theme";
import lang from "./lang";
import defaultValue from "./default";

const GLOBAL_STATE_CONTEXT = React.createContext({ theme, lang });

const GLOBAL_STATE_PROVIDER = ({ children }) => {
  // ---  主题状态部分 ---
  const [appTheme, setAppTheme] = React.useState(() => {
    let localTheme = localStorage["theme"];
    if (localTheme && Object.keys(theme).includes(localTheme)) {
      document.documentElement.setAttribute("theme", localTheme);
      return theme[localTheme];
    } else {
      const defaultTheme = defaultValue().theme;
      localStorage["theme"] = defaultTheme;
      document.documentElement.setAttribute("theme", defaultTheme);
      return theme[defaultTheme];
    }
  });
  const setGlobalAppTheme = (value) => {
    if (Object.keys(theme).includes(value)) {
      localStorage["theme"] = value;
      document.documentElement.setAttribute("theme", value);
      setAppTheme(theme[value]);
    } else {
      console.error("主题类型不对：", value);
    }
  };
  // ---  语言状态部分 ---
  const [appLanguage, setAppLanguage] = React.useState(() => {
    let localLanguage = localStorage["lang"];
    if (localLanguage && Object.keys(lang).includes(localLanguage)) {
      document.documentElement.setAttribute("lang", localLanguage);
      return lang[localLanguage];
    } else {
      const defaultLang = defaultValue().lang;
      localStorage["lang"] = defaultLang;
      document.documentElement.setAttribute("lang", defaultLang);
      return lang[defaultLang];
    }
  });

  const setGlobalAppLanguage = (value) => {
    if (Object.keys(lang).includes(value)) {
      localStorage["lang"] = value;
      document.documentElement.setAttribute("lang", value);
      setAppLanguage(lang[value]);
    } else {
      console.error("语言类型不对：", value);
    }
  };

  return (
    <GLOBAL_STATE_CONTEXT.Provider
      value={{
        THEME_KEY: localStorage["theme"],
        THEME: appTheme,
        SET_THEME: setGlobalAppTheme,
        LANG_KEY: localStorage["lang"],
        LANG: appLanguage,
        SET_LANG: setGlobalAppLanguage,
      }}
    >
      {children}
    </GLOBAL_STATE_CONTEXT.Provider>
  );
};

export { GLOBAL_STATE_PROVIDER, GLOBAL_STATE_CONTEXT };
