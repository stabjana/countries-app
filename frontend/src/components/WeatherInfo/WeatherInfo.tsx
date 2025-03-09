import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { WeatherData } from "../../types/weather";

interface WeatherInfoProps {
  weather?: WeatherData | null;
  error?: string | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather, error }) => {
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!weather) return <Typography>Loading weather info...</Typography>;

  const { temp, humidity } = weather.main;
  const { speed } = weather.wind;
  const { description, icon } = weather.weather[0];

  return (
    <Card elevation={3} sx={{ mt: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Weather Information
        </Typography>
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
          style={{ width: 60, height: 60 }}
        />
        <Typography variant="h5" sx={{ textTransform: "capitalize", mb: 2 }}>
          {description}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>🌡️ Temperature</TableCell>
                <TableCell>{temp.toFixed(1)}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>💧 Humidity</TableCell>
                <TableCell>{humidity}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>🌬️ Wind Speed</TableCell>
                <TableCell>{speed.toFixed(1)} m/s</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default WeatherInfo;
