import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// ─────────────────────────────────────────────────────────────────────────────
// NumberDetails — mirrors the API response shape exactly.
// expiresAt is kept as an ISO string so Redux stays serializable.
// ─────────────────────────────────────────────────────────────────────────────
export interface NumberDetails {
  _id: string | null;
  expiresAt: string;       // ISO 8601 string e.g. "2025-04-28T12:00:00.000Z"
  status: string;
  country: string;
  service: string;
  service_name: string;
  tel: string;
  idNum: string;           // The provider's number ID — always unique, used for targeting
  otp: string | null;
  otpReceived: boolean;
}

interface NumberState {
  numbers: NumberDetails[];
}

const initialState: NumberState = {
  numbers: [],
};

export const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {

    // 🔹 SET: Replace the entire list (used when fetching active numbers from API)
    setNumbers: (state, action: PayloadAction<NumberDetails[]>) => {
      state.numbers = action.payload;
    },

    // 🔹 ADD: Prepend a newly purchased number to the top of the list
    addNumber: (state, action: PayloadAction<NumberDetails>) => {
      state.numbers.unshift(action.payload); // unshift = add to front so it appears first
    },

    /**
     * 🔹 UPDATE: Patch specific fields of a number identified by idNum.
     *
     * We use `idNum` (provider ID) instead of `_id` (MongoDB ID) because:
     *  - `_id` can be null for numbers not yet saved in DB
     *  - `idNum` is always present and unique from the provider
     */
    updateNumber: (
      state,
      action: PayloadAction<{ idNum: string; updates: Partial<NumberDetails> }>
    ) => {
      const index = state.numbers.findIndex((n) => n.idNum === action.payload.idNum);
      if (index !== -1) {
        // Immer allows direct mutation — only provided fields are changed
        state.numbers[index] = { ...state.numbers[index], ...action.payload.updates };
      }
    },

    /**
     * 🔹 DELETE: Remove a number by idNum.
     * Called on cancel or ban actions.
     */
    deleteNumber: (state, action: PayloadAction<string>) => {
      state.numbers = state.numbers.filter((n) => n.idNum !== action.payload);
    },

    // 🔹 CLEAR: Wipe the entire list (e.g. on logout)
    clearNumbers: (state) => {
      state.numbers = [];
    },
  },
});

export const {
  setNumbers,
  addNumber,
  updateNumber,
  deleteNumber,
  clearNumbers,
} = numberSlice.actions;

export default numberSlice.reducer;