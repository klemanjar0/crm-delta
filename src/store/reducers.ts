import routerReducer from '../router/redux/reducer.ts';
import localeReducer from '../locale/redux/reducer.ts';
import authReducer from '../features/auth/redux/reducer.ts';

import { combineReducers } from 'redux';

const reducers = {
  router: routerReducer,
  locale: localeReducer,
  auth: authReducer,
};

export default combineReducers(reducers);
