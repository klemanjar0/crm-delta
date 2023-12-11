import axios, { AxiosResponse, AxiosError } from 'axios';
import _set from 'lodash/set';
import { RootState } from '../store';

export const endpoints = {
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
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
  const _accessToken = state.auth.accessToken;

  const jsonHeader = data ? { 'Content-Type': 'application/json' } : {};

  return {
    method,
    headers: {
      ...jsonHeader,
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
