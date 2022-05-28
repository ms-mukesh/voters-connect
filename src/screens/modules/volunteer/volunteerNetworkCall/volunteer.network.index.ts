import {USER_ACTION_STACK} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.const';
import callApi from '@/src/utils/api';
import {API_METHOD} from '@/src/constant/network';
import {SUCCESS_API_RESPONSE_CODE} from '@/src/constant/envConfig.index';
import {GET_VOLUNTEER_LIST_ENDPOINT} from '@/src/screens/modules/volunteer/volunteerNetworkCall/volunteer.network.const';

export const getVolunteerListFromDb = (
  isForVoter = false,
  shaktiKendraName = '',
  mandalName = '',
  familyNumber = '',
  village = '',
  boothId = '',
) => {
  return new Promise(async resolve => {
    try {
      const url =
        USER_ACTION_STACK +
        GET_VOLUNTEER_LIST_ENDPOINT +
        '?isForVoter=' +
        isForVoter +
        '&shaktiKendraName=' +
        shaktiKendraName +
        '&mandalName=' +
        mandalName +
        '&familyNumber=' +
        familyNumber +
        '&village=' +
        village +
        '&boothId=' +
        boothId;
      const volunteerRes = await callApi(url, API_METHOD.get);
      if (volunteerRes && volunteerRes?.status === SUCCESS_API_RESPONSE_CODE) {
        return resolve(volunteerRes?.data);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
