import _get from 'lodash/get';
import english from './mapping/en.ts';
import ukrainian from './mapping/ua.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Locale } from '../utils/constants.ts';
import DispatchService from '../services/DispatchService.ts';

const dict = {
  [Locale.EN]: english,
  [Locale.UA]: ukrainian,
};

export const useTranslate = () => {
  const currentLocale = useSelector((state: RootState) => state.locale.locale);
  return (path: string) => _get(dict[currentLocale], path);
};

export const getTranslator = () => {
  let currentLocale: Locale;

  try {
    currentLocale = DispatchService.getState().locale.locale;
  } catch (e) {
    currentLocale = Locale.EN;
  }

  return (path: string) => _get(dict[currentLocale], path);
};
