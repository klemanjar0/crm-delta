import { all, fork } from 'redux-saga/effects';

import localeSagas from '../locale/redux/sagas.ts';
import authSagas from '../features/auth/redux/sagas.ts';
import dashboardSagas from '../features/dashboard/redux/sagas.ts';

const rootSaga = function* () {
  yield all([fork(localeSagas), fork(authSagas), fork(dashboardSagas)]);
};

export default rootSaga;
