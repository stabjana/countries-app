import { Country } from "../../types/country";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="country-card">
      <img src={country.flags.png} alt={`${name} flag`} />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
    </div>
  );
};

export default CountryCard;
