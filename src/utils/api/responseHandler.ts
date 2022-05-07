import { NO_DATA_FOUND } from '@/src/constant/network';
import { showPopupMessage } from '@/src/utils/localPopup';

export const handleResponse = (
    url: string,
    response: any,
    method: string,
    needToastMessage = true
) => {
    if (response?.data) {
        if (__DEV__) {
            console.log('method--', method, ', Url--', url, ', response--');
        }
        if (needToastMessage) {
            showPopupMessage({ message: response?.data?.message ?? '' });
        }
        return Promise.resolve(response);
    } else {
        return Promise.reject(NO_DATA_FOUND);
    }
};
