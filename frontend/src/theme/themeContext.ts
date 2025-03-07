/* import { createContext } from "react";

type ThemeContextType = undefined;

export const ThemeContext = createContext<ThemeContextType>(undefined); */

import { createContext } from "react";

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Default values (can be overridden by the provider)
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {}, // Placeholder function
});

