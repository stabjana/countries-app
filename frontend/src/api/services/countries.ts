import axios from "axios";
import { Country } from "../../types/country";

const FIELDS =
  "name,capital,population,flags,cca3,languages,currencies,region,maps";

const restApi = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  params: {
    fields: FIELDS,
  },
});

export const countriesApi = {
  /**
   * Fetch all countries
   */
  getAllCountries: async (): Promise<Country[]> => {
    const response = await restApi.get(`/all`);
    return response.data;
  },

  /**
   * Fetch countries by name (e.g. "Finland")
   */
  getCountryByName: async (name: string): Promise<Country[]> => {
    const response = await restApi.get(`/name/${encodeURIComponent(name)}`);
    return response.data;
  },

  /**
   * Fetch country by 3-letter code (e.g. "FIN")
   */
  getCountryByCode: async (code: string): Promise<Country[]> => {
    const response = await restApi.get(`/alpha/${encodeURIComponent(code)}`);
    return response.data;
  },
};
