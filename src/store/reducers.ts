import routerReducer from '../router/redux/reducer.ts';
import localeReducer from '../locale/redux/reducer.ts';
import authReducer from '../features/auth/redux/reducer.ts';
import dashboardReducer from '../features/dashboard/redux/reducer.ts';

import { combineReducers } from 'redux';

const reducers = {
  router: routerReducer,
  locale: localeReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
};

export default combineReducers(reducers);
