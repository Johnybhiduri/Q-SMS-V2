import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  email: string;
  id: string;
  token: string;
  is_verified: boolean;
  balance: number;
  first_name?: string;
  last_name?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
}

// ✅ No localStorage here — plain clean initialState
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isVerified = action.payload.is_verified;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isVerified = false;
    },
    updateBalance(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateBalance } = authSlice.actions;
export default authSlice.reducer;