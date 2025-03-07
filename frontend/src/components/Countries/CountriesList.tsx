import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selectAllCountries,
} from "../../store/slices/countriesSlices";
import CountryCard from "./CountryCard";
import { Grid, Typography, Container } from "@mui/material";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(fetchAlLCountries());
  }, [dispatch]);

  if (loading) return <h3>Loading countries...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Countries
      </Typography>
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <CountryCard
              country={{
                name: {
                  common: country.name.common,
                  official: country.name.official,
                },
                capital: country.capital || ["N/A"],
                population: country.population,
                flags: { png: country.flags.png, svg: country.flags.svg },
                region: country.region || "Unknown",
                subregion: country.subregion || "Unknown",
                cca3: country.cca3,
                currencies: country.currencies,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountriesList;
