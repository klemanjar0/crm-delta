import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LocaleState } from './types.ts';
import { Locale } from '../../utils/constants.ts';

const initialState: LocaleState = {
  locale: Locale.EN,
};

export const localeSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    changeAppLocale: (state: LocaleState, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { changeAppLocale } = localeSlice.actions;

export default localeSlice.reducer;
