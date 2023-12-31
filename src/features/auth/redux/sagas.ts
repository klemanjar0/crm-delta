import { all, takeLatest, call, select, put } from 'redux-saga/effects';
import { LoginPayload, RegisterPayload } from './types.ts';
import {
  logInFailure,
  logInRequest,
  logInSuccess,
  logOut,
  registerFailure,
  registerRequest,
  registerSilentFailure,
  registerSilentRequest,
  registerSilentSuccess,
  registerSuccess,
  setUsername,
} from './reducer.ts';
import { getErrorMessage, showToast } from '../../../utils/utility.tsx';
import { buildHeaders, callApi, endpoints } from '../../../api';
import { RootState } from '../../../store';
import { FixTypeLater } from 'react-redux';
import { setBackScene } from '../../../router/redux/reducer.ts';
import { getUsersRequest } from '../../dashboard/redux/reducer.ts';

export function* registerSaga({ payload }: { payload: RegisterPayload }): FixTypeLater {
  try {
    const { email, role, password } = payload;
    const state: RootState = yield select();

    const response = yield call(callApi, endpoints.register, buildHeaders(state, { email, role, password }));

    yield put(registerSuccess(response || null));
    yield put(setUsername(email));
    yield put(setBackScene('/'));
  } catch (e) {
    yield put(registerFailure(getErrorMessage(e)));
    showToast('Something wrong during register.');
  }
}

export function* registerSilentSaga({ payload }: { payload: RegisterPayload }): FixTypeLater {
  try {
    const { email, role, password } = payload;
    const state: RootState = yield select();

    yield call(callApi, endpoints.register, buildHeaders(state, { email, role, password }));

    yield put(registerSilentSuccess());
    yield put(getUsersRequest());
  } catch (e) {
    yield put(registerSilentFailure(getErrorMessage(e)));
    showToast('Something wrong during creating user.');
  }
}

export function* loginSaga({ payload }: { payload: LoginPayload }): FixTypeLater {
  try {
    const { email, password } = payload;
    const state: RootState = yield select();

    const response = yield call(callApi, endpoints.login, buildHeaders(state, { email, password }));

    yield put(logInSuccess(response));
    yield put(setUsername(email));
    yield put(setBackScene('/'));
  } catch (e) {
    yield put(logInFailure(getErrorMessage(e)));
    showToast('Something wrong during login.');
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
    takeLatest(registerSilentRequest, registerSilentSaga),
  ]);
}
