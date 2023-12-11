import { all, takeLatest, call, select, put } from 'redux-saga/effects';
import { LoginPayload, RegisterPayload } from './types.ts';
import {
  logInFailure,
  logInRequest,
  logInSuccess,
  logOut,
  registerFailure,
  registerRequest,
  registerSuccess,
} from './reducer.ts';
import { getErrorMessage } from '../../../utils/utility.tsx';
import { buildHeaders, callApi, endpoints } from '../../../api';
import { RootState } from '../../../store';
import { FixTypeLater } from 'react-redux';
import { setBackScene } from '../../../router/redux/reducer.ts';

export function* registerSaga({ payload }: { payload: RegisterPayload }): FixTypeLater {
  try {
    const { email, role, password } = payload;
    const state: RootState = yield select();

    const response = yield call(callApi, endpoints.register, buildHeaders(state, { email, role, password }));

    yield put(registerSuccess(response || null));
    yield put(setBackScene('/'));
  } catch (e) {
    yield put(registerFailure(getErrorMessage(e)));
  }
}

export function* loginSaga({ payload }: { payload: LoginPayload }): FixTypeLater {
  try {
    const { email, password } = payload;
    const state: RootState = yield select();

    const response = yield call(callApi, endpoints.login, buildHeaders(state, { email, password }));

    yield put(logInSuccess(response));
    yield put(setBackScene('/'));
  } catch (e) {
    yield put(logInFailure(getErrorMessage(e)));
  }
}

export function* logOutSaga(): FixTypeLater {
  yield put(setBackScene('/'));
}

export default function* root() {
  yield all([
    takeLatest(registerRequest, registerSaga),
    takeLatest(logInRequest, loginSaga),
    takeLatest(logOut, logOutSaga),
  ]);
}
