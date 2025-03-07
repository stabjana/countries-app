import { createTheme, ThemeOptions } from "@mui/material/styles";

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

// Base typography settings
const typography: ThemeOptions["typography"] = {
  fontFamily: "Arimo, sans-serif",
  h1: { fontFamily: "Josefin Sans, sans-serif", fontSize: "2.5rem", fontWeight: 600 },
  h2: { fontFamily: "Josefin Sans, sans-serif", fontSize: "2rem", fontWeight: 600 },
  h3: { fontFamily: "Josefin Sans, sans-serif", fontSize: "1.75rem", fontWeight: 600 },
  body1: { fontSize: "1rem", lineHeight: 1.5 },
  button: { textTransform: "none" },
};

// Base component styles
const components: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
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
  typography,
  components,
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
  typography,
  components,
});
