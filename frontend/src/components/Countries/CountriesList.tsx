import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAlLCountries } from "../../store/slices/countriesSlices";
import CountryCard from "./CountryCard";
import { Grid, Typography, Container, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Country } from "../../types/country";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  const [searchText, setSearchText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  useEffect(() => {
    dispatch(fetchAlLCountries());
  }, [dispatch]);

  useEffect(() => {
    if (!searchText) {
      setFilteredCountries(countries); // Wenn kein Suchtext, zeige alle Länder
    } else {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, countries]);

  if (loading) return <h3>Loading countries...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Countries
      </Typography>

      <TextField
        fullWidth
        label="Search for a country..."
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={3}>
        {filteredCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountriesList;
