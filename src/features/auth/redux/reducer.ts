import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types.ts';

const initialState: AuthState = {
  accessToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state: AuthState, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    logIn: (state: AuthState, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state: AuthState) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAccessToken, logOut, logIn } = authSlice.actions;

export default authSlice.reducer;
