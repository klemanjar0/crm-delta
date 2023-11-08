import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RouterState } from './types.ts';

const initialState: RouterState = {
  key: 'initial',
  currentRoute: 'initial',
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setRouterKey: (state: RouterState, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setCurrentRoute: (state: RouterState, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setRouterKey, setCurrentRoute } = routerSlice.actions;

export default routerSlice.reducer;
