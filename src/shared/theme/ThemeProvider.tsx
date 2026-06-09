import { createContext, useContext } from "react";

import { lightTheme } from "./lightTheme";

const ThemeContext = createContext(lightTheme);

export function ThemeProvider({children,}: {
    children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={lightTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}