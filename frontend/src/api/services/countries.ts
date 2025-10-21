import { Country } from "../../types/country";
import { api } from "../axios";

const BASE_URL = "https://restcountries.com/v3.1";

const FIELDS =
  "name,capital,population,flags,cca3,languages,currencies,region,maps";

export const countriesApi = {
  /**
   * Fetch all countries
   */
  getAllCountries: async (): Promise<Country[]> => {
    const response = await api.get(`${BASE_URL}/all`, {
      params: { fields: FIELDS },
    });
    return response.data;
  },

  /**
   * Fetch countries by name (e.g. "Finland")
   */
  getCountryByName: async (name: string): Promise<Country[]> => {
    const response = await api.get(
      `${BASE_URL}/name/${encodeURIComponent(name)}`,
      {
        params: { fields: FIELDS },
      }
    );
    return response.data;
  },

  /**
   * Fetch country by 3-letter code (e.g. "FIN")
   */
  getCountryByCode: async (code: string): Promise<Country[]> => {
    const response = await api.get(
      `${BASE_URL}/alpha/${encodeURIComponent(code)}`,
      {
        params: { fields: FIELDS },
      }
    );
    return response.data;
  },
};
