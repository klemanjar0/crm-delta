import { all, takeLatest, call, select, put } from 'redux-saga/effects';

import {
  createPlaneFailure,
  createPlaneRequest,
  createPlaneSuccess,
  getPlanesFailure,
  getPlanesRequest,
  getPlanesSuccess,
} from './reducer.ts';
import { FixTypeLater } from 'react-redux';
import { getErrorMessage, showToast } from '../../../utils/utility.tsx';
import { RootState } from '../../../store';
import { buildHeaders, callApi, endpoints } from '../../../api';
import { Plane } from './types.ts';

export function* getPlanesRequestSaga(): FixTypeLater {
  try {
    const state: RootState = yield select();

    const response: { planes: Array<Plane> } = yield call(
      callApi,
      endpoints.planes,
      buildHeaders(state, undefined, 'GET'),
    );

    yield put(getPlanesSuccess(response.planes));
  } catch (e) {
    yield put(getPlanesFailure(getErrorMessage(e)));
    showToast(getErrorMessage(e));
  }
}

export function* createPlaneSaga({ payload }: { payload: Omit<Plane, 'id'> }): FixTypeLater {
  try {
    const state: RootState = yield select();

    const response: Plane = yield call(callApi, endpoints.planes, buildHeaders(state, payload, 'POST'));

    yield put(createPlaneSuccess());
    showToast(`${response.name} plane has been successfully created.`);
    yield put(getPlanesRequest());
  } catch (e) {
    yield put(createPlaneFailure(getErrorMessage(e)));
    showToast(getErrorMessage(e));
  }
}

export default function* root() {
  yield all([takeLatest(getPlanesRequest, getPlanesRequestSaga), takeLatest(createPlaneRequest, createPlaneSaga)]);
}
