import { all, takeLatest, call, select } from 'redux-saga/effects';
import { changeAppLocale } from './reducer.ts';
import { Locale } from '../../utils/constants.ts';
import { RootState } from '../../store';
import LocalStorageService from '../../services/LocalStorageService.ts';
import { getErrorMessage } from '../../utils/utility.tsx';

export function* persistLocale({ payload }: { payload: Locale }) {
  const key = 'locale';
  try {
    const state: RootState = yield select();
    const currentLocale = state.locale.locale;

    const persistedLocale: string | null = yield call(LocalStorageService.getItem, key);

    if (payload === currentLocale || payload === persistedLocale) {
      return;
    }

    yield call(LocalStorageService.setItem, key, payload);
  } catch (e) {
    console.error('persistLocale catch', getErrorMessage(e));
  }
}

export default function* root() {
  yield all([takeLatest(changeAppLocale, persistLocale)]);
}
