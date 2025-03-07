import { createTheme } from "@mui/material/styles";

// Define color palette
const colors = {
  primary: "#05668D",
  secondary: "#028090",
  accent: "#00A896",
  success: "#02C39A",
  backgroundLight: "#F0F3BD",
  backgroundDark: "#121212", // Dark mode background
  textLight: "#333333",
  textDark: "#ffffff",
};

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: colors.backgroundLight, paper: "#FFFFFF" },
    text: { primary: colors.textLight, secondary: colors.primary },
  },
  typography: {
    fontFamily: "Arimo, sans-serif",
    h1: { fontFamily: "Josefin Sans, sans-serif" },
    h2: { fontFamily: "Josefin Sans, sans-serif" },
    h3: { fontFamily: "Josefin Sans, sans-serif" },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: colors.accent },
    secondary: { main: colors.success },
    background: { default: colors.backgroundDark, paper: "#1E1E1E" },
    text: { primary: colors.textDark, secondary: colors.accent },
  },
  typography: {
    fontFamily: "Arimo, sans-serif",
    h1: { fontFamily: "Josefin Sans, sans-serif" },
    h2: { fontFamily: "Josefin Sans, sans-serif" },
    h3: { fontFamily: "Josefin Sans, sans-serif" },
  },
});
