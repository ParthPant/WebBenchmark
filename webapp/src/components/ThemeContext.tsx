import React, { ReactChild } from "react";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");

    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  // If you want to use dark theme as the default, return 'dark' instead
  return "light";
};

interface IContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = React.createContext({} as IContextProps);

export default function ThemeProvider ( props: {initialTheme?: 'dark'|'light', children: ReactChild|ReactChild[]}) {
  const [theme, setTheme] = React.useState<string>(getInitialTheme);

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);
    localStorage.setItem("color-theme", rawTheme);
  };

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
    'change',
    e => {
      e.matches ? rawSetTheme('dark') : rawSetTheme('light')
    }// listener
  );


  if (props.initialTheme) {
    rawSetTheme(props.initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
