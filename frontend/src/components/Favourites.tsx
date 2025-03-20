import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CountryFavorite } from "../types/favourite";
import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlices";
import { favoritesApi } from "../api/services/favourites";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Grid,
  Container,
  Zoom,
  Fab,
} from "@mui/material";
import CountryCard from "./Countries/CountryCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Pagination } from "@mui/material";

export const Favourites = () => {
  const { user } = useAuth(); // now we have access to the user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<CountryFavorite[]>([]);
  // access from redux - just access the state:
  const allCountries = useAppSelector(selectAllCountries);
  // use also pagination and Back to top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  useEffect(() => {
    // making an api call - get favourites from there
    if (!user) return;
    const fetchFavourites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await favoritesApi.getFavorites();
        setFavourites(data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setError("Failed to load favourites, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const convertToCountry = (favorite: CountryFavorite) => {
    const fullCountry = allCountries.find(
      (c) => c.name.common === favorite.country_name
    );
    if (fullCountry) {
      return fullCountry;
    }

    return {
      name: {
        common: favorite.country_name,
        official: favorite.country_name,
      },
      cca3: favorite.country_code,
      flags: {
        png: favorite.country_flag,
        svg: favorite.country_flag,
      },
      region: "Favourite",
      subregion: "Favourite",
      population: 0,
      capital: ["Favourite"],
      currencies: {
        FAV: {
          name: "Favourite currency",
          symbol: "🪨",
        },
      },
    };
  };
  if (!user) {
    return <div>Please login to view your Favourites</div>;
  }
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  // calculate the cards shown in one page
  const totalPages = favourites.length;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const countriesOnePage = favourites.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <Container sx={{ py: 4, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        My favourite countries
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {favourites.length === 0 ? (
        <Alert severity="info">You have no favourite countries yet.</Alert>
      ) : (
        <>
          <Grid container spacing={3} sx={{ py: 4, mt: -2 }}>
            {countriesOnePage.map((favorite) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
                <CountryCard country={convertToCountry(favorite)} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              count={Math.ceil(totalPages / cardsPerPage)}
              page={currentPage}
              onChange={(_e, page) => setCurrentPage(page)}
              color="primary"
              sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            />
          )}

          {/* Back to Top Button */}
          <Zoom in={showBackToTop}>
            <Fab
              color="primary"
              size="small"
              onClick={scrollToTop}
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                transition: "opacity 0.3s",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <ArrowUpwardIcon />
            </Fab>
          </Zoom>
        </>
      )}
    </Container>
  );
};
