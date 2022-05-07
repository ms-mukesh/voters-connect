import callApi from '@/src/utils/api';
import {API_METHOD} from '@/src/constant/network';
import {
  API_BASE_URL,
  SUCCESS_API_RESPONSE_CODE,
} from '@/src/constant/envConfig.index';
import {USER_ACTION_STACK} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.const';
import {GET_VOTER_LIST_ENDPOINT} from '@/src/screens/modules/voterList/voterListNetworkCall/voterList.const';

export const getVoterListFromDb = (pageNo = 1, limit = 1, searchKey = '') => {
  return new Promise(async resolve => {
    try {
      const url =
        USER_ACTION_STACK +
        GET_VOTER_LIST_ENDPOINT +
        '?pageNo=' +
        pageNo +
        '&limit=' +
        limit +
        '&searchKey=' +
        searchKey;
      const voterListRes = await callApi(
        url,
        API_METHOD.get,
        {},
        API_BASE_URL,
        {},
        true,
        false,
      );

      if (voterListRes && voterListRes?.status === SUCCESS_API_RESPONSE_CODE) {
        console.log(voterListRes?.data);
        return resolve(voterListRes);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
