import { Country } from "../../types/country";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import { Payments, Public, LocationCity, People } from "@mui/icons-material";
import { FavoriteButton } from "../Auth/FavouriteButton";
import { Link } from "react-router-dom";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        borderRadius: 3,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        },
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Link
        key={country.name.common}
        to={`/country/${encodeURIComponent(country.name.common.toLowerCase())}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {country.name.common}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <Public color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {country.region}
              {country.subregion && ` (${country.subregion})`}
            </Typography>
          </Box>

          {country.capital && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
              <LocationCity color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {country.capital[0]}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <People color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {country.population.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Payments color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {getCurrencies()}
            </Typography>
          </Box>
        </CardContent>
      </Link>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
        <FavoriteButton country={country} />
      </CardActions>
    </Card>
  );
};

export default CountryCard;
