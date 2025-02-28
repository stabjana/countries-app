import { useParams } from "react-router-dom";
import { Country } from "../../types/country";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAlLCountries,
  selCountriesLoading,
  selectAllCountries,
  selectCountriesError,
} from "../../store/slices/countriesSlices";
import { useEffect } from "react";

const CountryDetail = () => {
  const { name } = useParams();
  const countries = useAppSelector(selectAllCountries); // get from the redux state because we fetch all the countries
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  // for using the name as endpoint
  const country = countries.find(
    (country: Country) =>
      country.name.common.toLowerCase() === decodeURIComponent(name || "")
  ); // or just name

  // useEffect to check if country is empty and then dispatch the fetchAllCountries
  useEffect(() => {
    if (!country) {
      dispatch(fetchAlLCountries());
    }
  }, [country, dispatch]);

  console.log(name);
};

export default CountryDetail;
