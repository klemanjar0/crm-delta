import axios, { AxiosResponse, AxiosError } from 'axios';
import _set from 'lodash/set';
import { RootState } from '../store';
import DispatchService from '../services/DispatchService.ts';
import { logOut } from '../features/auth/redux/reducer.ts';
import { showToast } from '../utils/utility.tsx';

export const endpoints = {
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
  planes: '/api/v1/planes',
  pilots: '/api/v1/pilots',
  flights: '/api/v1/flights',
  users: '/api/v1/users',
};

const server = 'http://localhost:5270';

export const withServer = (endpoint: string) => `${server}${endpoint}`;

export const instance = axios.create();

export const modifyHeader = (key: string, value: unknown) => {
  _set(instance, ['defaults', 'headers', key], value);
};

const getHeaders = () => {
  return instance.defaults.headers;
};

export const responseInterceptors = {
  onFulfilled: (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  onRejected: (error: AxiosError) => {
    const statusCode = error?.response?.status;

    if (statusCode === 401) {
      showToast('Access Token has expired');
      DispatchService.dispatch(logOut());
    }

    throw error;
  },
};

const NetworkService = () => {
  instance.interceptors.response.use(responseInterceptors.onFulfilled, responseInterceptors.onRejected);
  return {
    request: instance,
    getHeaders,
    setDefaultHeaders: modifyHeader,
  };
};

export const buildHeaders = (state: RootState, data: unknown, method = 'POST') => {
  const accessToken = state.auth.accessToken;

  const jsonHeader = data ? { 'Content-Type': 'application/json' } : {};

  const access = accessToken ? `Bearer ${accessToken}` : undefined;

  return {
    method,
    headers: {
      ...jsonHeader,
      Authorization: access,
    },
    ...(data ? { data } : {}),
  };
};

export const callApi = async (endpoint: string, options: any) => {
  const finalEndpoint = withServer(endpoint);

  const response = await NetworkService().request({
    url: finalEndpoint,
    ...options,
  });

  return options.fullResponse ? response : response.data;
};

export default NetworkService();
