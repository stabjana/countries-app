import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selCountriesLoading,
  selectAllCountries,
  selectCountriesError,
} from "../../store/slices/countriesSlices";
import weatherApi from "../../api/services/weather";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import { WeatherData } from "../../types/weather";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import StoreIcon from "@mui/icons-material/Store";

const CountryDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  // Finde das Land basierend auf dem Namen
  const country = countries.find(
    (country) => country.name.common.toLowerCase() === name?.toLowerCase()
  );

  // Lade die Länder, falls sie nicht verfügbar sind
  useEffect(() => {
    if (!country) {
      dispatch(fetchAlLCountries());
    }
  }, [country, dispatch]);

  // Lade das Wetter, wenn das Land verfügbar ist
  useEffect(() => {
    if (country?.capital) {
      weatherApi
        .getWeatherByCity(country.capital[0])
        .then(setWeather)
        .catch((err) => setWeatherError(err.message));
    }
  }, [country]);

  if (loading) return <CircularProgress />;
  if (error) return <h3>{error}</h3>;
  if (!country) return <h3>Country not found. Please try again.</h3>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 4,
          paddingX: { xs: 2, md: 4 },
        }}
      >
        <Card
          sx={{
            display: "flex",
            maxWidth: 1200,
            textAlign: "left",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Grid container spacing={3} sx={{ padding: 2 }}>
            {/* Linke Seite: Landdetails (Flagge und Infos) */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={country.flags.png}
                  alt={`${country.name.common} flag`}
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                />
                <CardContent sx={{ mt: 2 }}>
                  <Typography variant="h3" gutterBottom>
                    {country.name.common}
                  </Typography>

                  {/* Capital */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationCityIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Capital: {country.capital?.[0] || "N/A"}
                    </Typography>
                  </Box>

                  {/* Population */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PeopleIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Population: {country.population.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Region */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PublicIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Region: {country.region}
                    </Typography>
                  </Box>

                  {/* Subregion */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <StoreIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Subregion: {country.subregion}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Grid>

            {/* Rechte Seite: Wetterinformationen */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Vertikal zentrieren
                height: "100%", // Sicherstellen, dass der Grid 100% Höhe hat
              }}
            >
              <CardContent sx={{ flexShrink: 0 }}>
                {/* Wetter Info */}
                {weatherError ? (
                  <Typography color="error">{weatherError}</Typography>
                ) : (
                  <WeatherInfo weather={weather} error={weatherError} />
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default CountryDetail;
