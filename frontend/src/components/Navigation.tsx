// navigation
import { AppBar, Button, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Favorite, Lock } from "@mui/icons-material";
import { ThemeContext } from "../theme/themeContext";
import { useContext } from "react";

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
        <Button color="inherit" component={RouterLink} to="/countriesgame">
          Flag Quiz
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/protected"
          startIcon={<Lock />}
        >
          ProtectedData
        </Button>

        {user ? (
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}

        <Button color="inherit" component={RouterLink} to="/countries">
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
        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{ ml: "auto", mr: 2 }}
        >
          {isDarkMode ? "Light" : "Dark"} Mode
        </Button>
      </Toolbar>
    </AppBar>
  );
};
