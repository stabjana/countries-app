import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryState } from "../../types/country";

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
}

export const fetchAlLCountries = createAsyncThunk('countries/fetchAllCountries', async () => {
    // todo
})

export const countriesSlice = createSlice ({
    name: 'countries',
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
     // funct
    }

})