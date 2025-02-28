import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAlLCountries,
  selectAllCountries,
} from "../store/slices/countriesSlices";
import CountryCard from "./CountryCard";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);

  useEffect(() => {
    dispatch(fetchAlLCountries());
  }, [dispatch]);

  return (
    <div>
      <h1>Countries</h1>
      <div className="countries-list">
        {countries.map((country) => (
          <Link key={country.cca3} to={`/country/${country.cca3}`}>
            <CountryCard
              name={country.name.common}
              capital={country.capital?.[0] || "N/A"}
              population={country.population}
              flag={country.flags.png}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
