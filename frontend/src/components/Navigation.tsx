import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Favorite} from "@mui/icons-material";
import { ThemeContext } from "../theme/themeContext";
import { useContext } from "react";
import { colors } from "../theme/theme";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static" sx={{ mb: 0 }}>
      <Toolbar>
        {[
          { label: "Home", path: "/" },
          { label: "Test", path: "/test" },
          { label: "Flag Quiz", path: "/countriesgame" },
          { label: "All Countries", path: "/countries" },
        ].map(({ label, path }) => (
          <Button
            key={path}
            color="inherit"
            component={RouterLink}
            to={path}
            onClick={(_e) => {
              if (window.location.pathname === path) {
                window.location.reload();
              }
            }}
            sx={{
              position: "relative",
              overflow: "hidden",
              mr: 2,
              "&:hover::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)",
                animation: "glitter 0.8s ease-out",
              },
              "@keyframes glitter": {
                "0%": { opacity: 1, transform: "scale(1)" },
                "100%": { opacity: 0, transform: "scale(2)" },
              },
            }}
          >
            {label}
          </Button>
        ))}

        {user && (
          <Button
            color="inherit"
            component={RouterLink}
            to="/favourites"
            startIcon={<Favorite />}
            sx={{
              position: "relative",
              overflow: "hidden",
              "&:hover::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)",
                animation: "glitter 0.8s ease-out",
              },
            }}
          >
            Favourites
          </Button>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <Button
            color="inherit"
            onClick={signOut}
            sx={{
              mr: 2,
              position: "relative",
              overflow: "hidden",
              "&:hover::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)",
                animation: "glitter 0.8s ease-out",
              },
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            sx={{
              mr: 2,
              position: "relative",
              overflow: "hidden",
              "&:hover::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)",
                animation: "glitter 0.8s ease-out",
              },
            }}
          >
            Login
          </Button>
        )}

        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{
            ml: 2,
            backgroundColor: isDarkMode ? colors.accent : "#FF6699",
            "&:hover": {
              backgroundColor: isDarkMode ? "#bc6120" : "#c6295d",
            },
          }}
        >
          {isDarkMode ? "Light" : "Dark"} Mode
        </Button>
      </Toolbar>
    </AppBar>
  );
};
