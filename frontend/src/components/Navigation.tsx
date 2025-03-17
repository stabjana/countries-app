// navigation
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Favorite, Lock } from "@mui/icons-material";
import { ThemeContext } from "../theme/themeContext";
import { useContext } from "react";
import { colors } from "../theme/theme";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/test">
          Test
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/protected"
          startIcon={<Lock />}
          sx={{ mr: 2 }}
        >
          ProtectedData
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/countriesgame"
          sx={{ mr: 2 }}
        >
          Flag Quiz
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/countries"
          sx={{ mr: 2 }}
        >
          All Countries
        </Button>
        {user && (
          <Button
            color="inherit"
            component={RouterLink}
            to="/favourites"
            startIcon={<Favorite />}
          >
            Favourites
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Button color="inherit" onClick={signOut} sx={{ mr: 2 }}>
            Logout
          </Button>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
        )}
        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{
            ml: 2, // Abstand zum Logout-Button
            backgroundColor: isDarkMode ? colors.accent : "#FF6699", // Dynamische Farbwahl
            "&:hover": {
              backgroundColor: isDarkMode ? "#bc6120" : "#c6295d", // Hover-Farbe für beide Themes
            },
          }}
        >
          {isDarkMode ? "Light" : "Dark"} Mode
        </Button>
      </Toolbar>
    </AppBar>
  );
};
