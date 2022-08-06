import callApi from '@/src/utils/api';

import {API_METHOD} from '@/src/constant/network';
import {
  ADD_BULK_VOTER_LIST_ENDPOINT,
  GET_DASHBOARD_DETAILS,
  SEND_BROADCAST_MESSAGE,
  USER_ACTION_STACK,
} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.const';
import {showPopupMessage} from '@/src/utils/localPopup';
import {SUCCESS_API_RESPONSE_CODE} from '@/src/constant/envConfig.index';
import useSWR, {mutate, SWRConfiguration} from 'swr';
import fetcher from '@/src/lib/swr';

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
      console.log('res--', obj);
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

export function GetDashboardDetails(options?: SWRConfiguration) {
  const {data, error} = useSWR<any>(
    USER_ACTION_STACK + GET_DASHBOARD_DETAILS,
    url => fetcher<any>(url),
    options,
  );

  return {
    data: data?.data,
    loading: !error && !data,
    error,
    mutate,
  };
}

export const sendBroadCastMessageFromDb = (reqObj: any) => {
  return new Promise(async resolve => {
    try {
      const obj = {
        data: reqObj,
      };
      const sendMessageRes = await callApi(
        USER_ACTION_STACK + SEND_BROADCAST_MESSAGE,
        API_METHOD.post,
        obj,
      );
      if (
        sendMessageRes &&
        sendMessageRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        showPopupMessage({message: 'Sent!'});
        return resolve(true);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
