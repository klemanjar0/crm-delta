import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RouterState } from './types.ts';

const initialState: RouterState = {
  key: 'initial',
  currentRoute: 'initial',
  backScene: null,
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
    setBackScene: (state: RouterState, action: PayloadAction<string | null>) => {
      state.backScene = action.payload;
    },
  },
});

export const { setRouterKey, setCurrentRoute, setBackScene } = routerSlice.actions;

export default routerSlice.reducer;
