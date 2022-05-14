import {USER_ACTION_STACK} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.const';
import callApi from '@/src/utils/api';
import {API_METHOD} from '@/src/constant/network';
import {
  API_BASE_URL,
  SUCCESS_API_RESPONSE_CODE,
} from '@/src/constant/envConfig.index';
import {
  ADD_NEW_ELECTION_ENDPOINT,
  ADD_VOTER_ENTRY_IN_ELECTION_MASTER_ENDPOINT,
  GET_ELECTION_LIST_ENDPOINT,
  GET_FILTER_KEYWORD_ENDPOINT,
  GET_VOTER_LIST_BY_ELECTION_ID,
  REMOVE_VOTER_ENTRY_IN_ELECTION_MASTER_ENDPOINT,
  UPDATE_ELECTION_DETAILS_ENDPOINT,
  VOTER_STATUS,
} from '@/src/screens/modules/election/electionNetworkCall/election.network.const';
import {showPopupMessage} from '@/src/utils/localPopup';

export const getElectionListFromDb = () => {
  return new Promise(async resolve => {
    try {
      const url = USER_ACTION_STACK + GET_ELECTION_LIST_ENDPOINT;

      const electionListRes = await callApi(
        url,
        API_METHOD.get,
        {},
        API_BASE_URL,
        {},
        true,
        false,
      );

      if (
        electionListRes &&
        electionListRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        return resolve(electionListRes?.data);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
export const addNewElectionToDb = (obj: any) => {
  return new Promise(async resolve => {
    try {
      const url = USER_ACTION_STACK + ADD_NEW_ELECTION_ENDPOINT;

      const addElectionRes = await callApi(
        url,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        {},
        true,
        false,
      );

      if (
        addElectionRes &&
        addElectionRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        showPopupMessage({message: 'Election Details added'});
        return resolve(addElectionRes?.data);
      } else {
        showPopupMessage({
          message: 'Failed to add Election details',
          type: 'error',
        });
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};

export const updateElectionDetailsToDb = (obj: any) => {
  return new Promise(async resolve => {
    try {
      const url = USER_ACTION_STACK + UPDATE_ELECTION_DETAILS_ENDPOINT;

      const updateElectionRes = await callApi(
        url,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        {},
        true,
        false,
      );

      if (
        updateElectionRes &&
        updateElectionRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        showPopupMessage({message: 'Election Details updated'});
        return resolve(updateElectionRes?.data);
      } else {
        showPopupMessage({
          message: 'Failed to update Election details',
          type: 'error',
        });
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
export const getVoterListByElectionIdFromDb = (
  electionId: number,
  voterStatus = VOTER_STATUS.isVoted,
  searchKey = '',
) => {
  return new Promise(async resolve => {
    try {
      const url =
        USER_ACTION_STACK +
        GET_VOTER_LIST_BY_ELECTION_ID +
        '?electionId=' +
        electionId +
        '&isVoted=' +
        voterStatus +
        '&searchKey=' +
        searchKey;

      const voterElectionListRes = await callApi(
        url,
        API_METHOD.get,
        {},
        API_BASE_URL,
        {},
        true,
        false,
      );
      if (
        voterElectionListRes &&
        voterElectionListRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        return resolve(voterElectionListRes?.data);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};

export const addVoterEntryInElectionMaster = (obj: any) => {
  return new Promise(async resolve => {
    try {
      const url =
        USER_ACTION_STACK + ADD_VOTER_ENTRY_IN_ELECTION_MASTER_ENDPOINT;

      const updateElectionRes = await callApi(
        url,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        {},
        true,
        false,
      );

      if (
        updateElectionRes &&
        updateElectionRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        showPopupMessage({message: 'Voter status updated'});
        return resolve(updateElectionRes?.data);
      } else {
        showPopupMessage({
          message: 'Failed to add voter Election details',
          type: 'error',
        });
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};

export const removeVoterEntryInElectionMaster = (obj: any) => {
  return new Promise(async resolve => {
    try {
      const url =
        USER_ACTION_STACK + REMOVE_VOTER_ENTRY_IN_ELECTION_MASTER_ENDPOINT;

      const updateElectionRes = await callApi(
        url,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        {},
        true,
        false,
      );

      if (
        updateElectionRes &&
        updateElectionRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        showPopupMessage({message: 'Voter status updated'});
        return resolve(updateElectionRes?.data);
      } else {
        showPopupMessage({
          message: 'Failed to remove voter Election details',
          type: 'error',
        });
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};

export const getFilterKeywordFromDb = () => {
  return new Promise(async resolve => {
    try {
      const url = USER_ACTION_STACK + GET_FILTER_KEYWORD_ENDPOINT;

      const keywordListRes = await callApi(
        url,
        API_METHOD.get,
        {},
        API_BASE_URL,
        {},
        true,
        false,
      );
      if (
        keywordListRes &&
        keywordListRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        return resolve(keywordListRes?.data);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
