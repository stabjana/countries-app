import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAlLCountries } from "../../store/slices/countriesSlices";
import CountryCard from "./CountryCard";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Fab,
  Zoom,
  Pagination,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Country } from "../../types/country";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  const [searchText, setSearchText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchAlLCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    if (!searchText) {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  }, [searchText, countries]);

  // Scroll Listener for the Back to Top Button Visibility
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

  if (loading) return <h3>Loading countries...</h3>;
  if (error) return <h3>{error}</h3>;

  // calculate the cards shown in one page
  const totalPages = filteredCountries.length;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const countriesOnePage = filteredCountries.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <Container sx={{ py: 4, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Countries
      </Typography>

      <TextField
        aria-label="Search for a country..."
        fullWidth
        label="Search for a country..."
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={3}>
        {countriesOnePage.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => setCurrentPage(page)}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />

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
    </Container>
  );
};

export default CountriesList;
