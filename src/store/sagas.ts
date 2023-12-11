import { all, fork } from 'redux-saga/effects';

import localeSagas from '../locale/redux/sagas.ts';
import authSagas from '../features/auth/redux/sagas.ts';

const rootSaga = function* () {
  yield all([fork(localeSagas), fork(authSagas)]);
};

export default rootSaga;
