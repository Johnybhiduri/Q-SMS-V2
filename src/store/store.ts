import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import countryReducer from "./countrySlice";
import numberReducer from "./numberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countryReducer,
    numbers: numberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;