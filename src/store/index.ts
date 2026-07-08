// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import numberReducer from "./numberSlice";
import countryReducer from "./countrySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  number: numberReducer,
  country: countryReducer,
});

const resettableReducer = (state: any, action: any) => {
  if (action.type === "RESET") {
    state = undefined; // every slice goes back to its true initialState
  }
  return rootReducer(state, action);
};

// 👇 Read token here — at store creation time, not slice definition time
const token = localStorage.getItem("token");

export const store = configureStore({
  reducer: resettableReducer,
  preloadedState: token
    ? {
        auth: {
          user: null,
          token: token,
          isAuthenticated: true,
          isVerified: false,
        },
      }
    : undefined, // no token → no preloaded state → all slices use initialState
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;