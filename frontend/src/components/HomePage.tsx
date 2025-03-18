import { Box, Typography, Button, Card, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/wallpaperbetter.com_1920x1080.jpg')",
        objectFit: "cover",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          textAlign: "center",
          bgcolor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
          color: isDarkMode ? "#F3FBFF" : "#001823",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Your App 🌍
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          This is not just an app. It's an adventure. A playground. A little
          universe where you can explore countries, see real-time weather data
          for their capitals, play a flag game, and keep track of your
          favorites! Plus, secure login with Supabase authentication gives you
          access to exclusive content!
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/countries"
          >
            Explore Countries
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/countriesgame"
          >
            Play the Game
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/test"
          >
            View Test Data
          </Button>
          <Button
            variant="outlined"
            color="warning"
            component={Link}
            to="/favourites"
          >
            My Favorites
          </Button>
          <Button variant="contained" color="info" component={Link} to="/login">
            Login / Sign Up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 4, opacity: 0.8 }}>
          Dark mode or light mode? You choose! Adjust settings anytime to match
          your vibe. 🌗
        </Typography>
      </Card>
    </Box>
  );
};

export default HomePage;
