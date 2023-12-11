export enum Locale {
  EN = 'en',
  UA = 'ua',
}

export type AssetsState<T = unknown> = {
  data: Array<T>;
  fetching: boolean;
  total: number;
  loaded: boolean;
  error: string | null;
};

export const initialAssetsState: AssetsState = {
  data: [],
  total: 0,
  fetching: false,
  error: null,
  loaded: false,
};

export const initAssetsState = <T>() => initialAssetsState as AssetsState<T>;

export default { Locale, initialAssetsState };
