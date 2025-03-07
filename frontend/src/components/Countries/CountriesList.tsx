import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selectAllCountries,
} from "../../store/slices/countriesSlices";
import CountryCard from "./CountryCard";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  // const countries = useAppSelector(selectAllCountries);
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(fetchAlLCountries());
  }, [dispatch]);

  if (loading) return <h3>Loading countries...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <h1>Countries</h1>
      <div className="countries-list">
        {countries.map((country) => (
          <CountryCard
            country={{
              name: {
                common: country.name.common,
                official: country.name.official,
              },
              capital: country.capital || ["N/A"],
              population: country.population,
              flags: { png: country.flags.png, svg: country.flags.svg },
              region: "Unknown",
              subregion: "Unknown",
              cca3: country.cca3,
              currencies: country.currencies,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
