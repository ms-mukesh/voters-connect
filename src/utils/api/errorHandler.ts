import {UNKNOWN_ERROR} from '@/src/constant/network';
import {showPopupMessage} from '@/src/utils/localPopup';

export const handleCatchError = (url: string, err: any) => {
  if (__DEV__) {
    console.log('api call error --- ', url, err);
  }
  showPopupMessage({
    message: UNKNOWN_ERROR,
    type: 'error',
  });
  if (err.errCode === 401) {
    console.log('called');
  }

  return Promise.reject(err?.response?.data ?? UNKNOWN_ERROR);
};
