import _get from 'lodash/get';
import { toast } from 'react-toastify';
import { colors } from '../theme/colors.ts';

export const getErrorMessage = (e: unknown) => _get(e, ['message'], '');

export const showToast = (message: string) => {
  toast(message, {
    hideProgressBar: true,
    type: 'default',
    bodyStyle: { backgroundColor: colors.toast, color: colors.white },
    style: { right: 0, position: 'absolute', top: 30, backgroundColor: colors.toast },
  });
};
