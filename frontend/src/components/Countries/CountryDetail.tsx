import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Country } from "../../types/country";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selCountriesLoading,
  selectAllCountries,
  selectCountriesError,
} from "../../store/slices/countriesSlices";

const CountryDetail: React.FC = () => {
  const { cc3 } = useParams<{ cc3: string }>();
  const { name } = useParams();
  const countries = useAppSelector(selectAllCountries); // get from the redux state because we fetch all the countries
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  // using the country code as endpoint
  const country = countries.find(
    (country) => country.cca3.toLowerCase() === cc3?.toLowerCase()
  );

  // useEffect to check if country is empty and then dispatch the fetchAllCountries
  useEffect(() => {
    if (!country) {
      dispatch(fetchAlLCountries());
    }
  }, [country, dispatch]);

  if (loading) return <h3>Loading country details... </h3>;
  if (error) return <h3>{error}</h3>;
  if (!country) return <h3>Country not found. Please try again.</h3>;

  return (
    <div className="country-detail">
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <p>Capital: {country.capital?.[0] || "N/A"}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
};

export default CountryDetail;
