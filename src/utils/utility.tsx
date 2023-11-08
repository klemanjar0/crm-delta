import _get from 'lodash/get';

export const getErrorMessage = (e: unknown) => _get(e, ['message'], '');
