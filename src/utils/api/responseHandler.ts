import {NO_DATA_FOUND} from '@/src/constant/network';
import {implementReplaceNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';

export const handleResponse = (
  url: string,
  response: any,
  method: string,
  needToastMessage = true,
) => {
  if (response?.data?.errCode === 401) {
    console.log('called--');
    implementReplaceNavigation(null, SCREEN_NAME.entrance);
  }

  if (response?.data) {
    if (__DEV__) {
      console.log('method--', method, ', Url--', url, ', response--');
    }
    if (needToastMessage) {
      // showPopupMessage({message: response?.data?.data ?? ''});
    }
    return Promise.resolve(response);
  } else {
    return Promise.reject(NO_DATA_FOUND);
  }
};
