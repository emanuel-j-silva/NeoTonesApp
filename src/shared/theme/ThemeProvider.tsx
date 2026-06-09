import { createContext, useContext, useState } from "react";

import { AppTheme } from "./AppTheme";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

type ThemeContextData = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextData>(
    {} as ThemeContextData
  );

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] =
    useState(false);

  const toggleTheme = () => {
    setIsDark(previous => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme: lightTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}