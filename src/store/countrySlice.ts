import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Type for country object
export type CountriesState = Record<string, string>;

// Initial state
const initialState: CountriesState = {};

// Slice
const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // Replace all countries
    // @ts-ignore
    setCountries: (state, action: PayloadAction<CountriesState>) => {
      return action.payload;
    },

    // Add/update single country
    addCountry: (
      state,
      action: PayloadAction<{ name: string; code: string }>
    ) => {
      const { name, code } = action.payload;
      state[name] = code;
    },

    // Remove country
    removeCountry: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

// Export actions
export const { setCountries, addCountry, removeCountry } =
  countrySlice.actions;

// Export reducer
export default countrySlice.reducer;