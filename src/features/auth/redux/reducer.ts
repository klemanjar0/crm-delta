import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginPayload, RegisterPayload } from './types.ts';

const initialState: AuthState = {
  accessToken: null,
  username: null,
  isLoggedIn: false,
  fetching: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state: AuthState) => {
      state.error = null;
    },
    setAccessToken: (state: AuthState, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setUsername: (state: AuthState, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    logIn: (state: AuthState, action: PayloadAction<{ token: string | null; username: string | null }>) => {
      state.accessToken = action.payload.token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logOut: (state: AuthState) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
    registerRequest: (state: AuthState, _: PayloadAction<RegisterPayload>) => {
      state.fetching = true;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
    registerSuccess: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    registerFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    registerSilentRequest: (state: AuthState, _: PayloadAction<RegisterPayload>) => {
      state.fetching = true;
    },
    registerSilentSuccess: (state: AuthState) => {
      state.fetching = false;
    },
    registerSilentFailure: (state: AuthState) => {
      state.fetching = false;
    },
    logInRequest: (state: AuthState, _: PayloadAction<LoginPayload>) => {
      state.fetching = true;
      state.isLoggedIn = false;
    },
    logInSuccess: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    logInFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export const {
  setAccessToken,
  logOut,
  logIn,
  registerSuccess,
  registerRequest,
  registerFailure,
  logInSuccess,
  logInFailure,
  logInRequest,
  setUsername,
  resetAuthError,
  registerSilentFailure,
  registerSilentSuccess,
  registerSilentRequest,
} = authSlice.actions;

export default authSlice.reducer;
