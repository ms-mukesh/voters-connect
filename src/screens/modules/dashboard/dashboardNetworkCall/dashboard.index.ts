import callApi from '@/src/utils/api';

import {API_METHOD} from '@/src/constant/network';
import {
  ADD_BULK_VOTER_LIST_ENDPOINT,
  USER_ACTION_STACK,
} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.const';
import {showPopupMessage} from '@/src/utils/localPopup';
import {SUCCESS_API_RESPONSE_CODE} from '@/src/constant/envConfig.index';

export const addBulkVoterListInDb = (dataArray: any = []) => {
  return new Promise(async resolve => {
    try {
      const obj = {
        data: dataArray,
      };
      const addBulkDataRes = await callApi(
        USER_ACTION_STACK + ADD_BULK_VOTER_LIST_ENDPOINT,
        API_METHOD.post,
        obj,
      );
      if (
        addBulkDataRes &&
        addBulkDataRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        showPopupMessage({message: 'Date added!!'});
        return resolve(true);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
