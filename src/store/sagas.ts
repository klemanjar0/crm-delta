import { all, fork } from 'redux-saga/effects';

import localeSagas from '../locale/redux/sagas.ts';

const rootSaga = function* () {
  yield all([fork(localeSagas)]);
};

export default rootSaga;
