import callApi from '@/src/utils/api';
import {
  GENERATE_OTP_ENDPOINT,
  GET_PROFILE_DATA_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGIN_STACK,
  SIGNUP_API_REQ_TYPE,
  SIGNUP_USER_ENDPOINT,
  SIGNUP_USER_V2_ENDPOINT,
  VERIFY_OTP_ENDPOINT,
} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.const';
import {API_METHOD} from '@/src/constant/network';
import {
  awsAuthHeaderConfig,
  generateOtpPurpose,
  verifyOtpPurpose,
} from '@/src/config/awsConfig.index';
import {
  API_BASE_URL,
  SUCCESS_API_RESPONSE_CODE,
} from '@/src/constant/envConfig.index';
import {USER_ACTION_STACK} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.const';
import {showPopupMessage} from '@/src/utils/localPopup';

export const generateOtpFromApi = (
  fieldValue = '',
  purpose = generateOtpPurpose.login,
) => {
  return new Promise(async resolve => {
    try {
      const obj =
        purpose === generateOtpPurpose.email
          ? {
              purpose: purpose,
              email: fieldValue,
            }
          : {
              phone_number: fieldValue,
              purpose: purpose,
            };
      const generateApiRes = await callApi(
        GENERATE_OTP_ENDPOINT,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        awsAuthHeaderConfig,
      );
      if (generateApiRes) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
export const verifyOtpFromApi = (
  fieldValue = '',
  otp = '',
  purpose = verifyOtpPurpose.phoneNumber,
) => {
  return new Promise(async resolve => {
    try {
      const obj =
        purpose === verifyOtpPurpose.phoneNumber
          ? {
              phone_number: fieldValue,
              otp: otp,
              purpose: purpose,
            }
          : {
              otp: otp,
              purpose: purpose,
              email: fieldValue,
            };
      const verifyOtpApiRes = await callApi(
        VERIFY_OTP_ENDPOINT,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        awsAuthHeaderConfig,
      );

      if (verifyOtpApiRes) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
export const signupUserFromApi = ({
  phone_number = '',
  name = '',
  email = '',
  password = '',
}: SIGNUP_API_REQ_TYPE) => {
  return new Promise(async resolve => {
    try {
      const obj = {
        phone_number: phone_number,
        name: name,
        email: email,
        password: password,
      };
      console.log(obj);
      const signUpUserApiRes = await callApi(
        SIGNUP_USER_ENDPOINT,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        awsAuthHeaderConfig,
      );
      console.log('signUpUserApiRes--', signUpUserApiRes);
      if (
        signUpUserApiRes &&
        signUpUserApiRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        return resolve(signUpUserApiRes);
      } else {
        showPopupMessage({
          message: signUpUserApiRes?.data ?? 'Invalid details',
          type: 'error',
        });

        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};

export const loginUserApi = (emailId = '', password = '') => {
  return new Promise(async resolve => {
    try {
      const obj = {
        email: emailId,
        password: password,
      };
      const loginUserApiRes = await callApi(
        LOGIN_STACK + LOGIN_ENDPOINT,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        {},
        false,
      );
      console.log(loginUserApiRes?.status);
      if (
        loginUserApiRes &&
        loginUserApiRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        return resolve(loginUserApiRes);
      } else {
        showPopupMessage({message: 'Invalid details', type: 'error'});
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};

export const signupUserApi = (obj: any) => {
  return new Promise(async resolve => {
    try {
      const signupUserApiRes = await callApi(
        LOGIN_STACK + SIGNUP_USER_V2_ENDPOINT,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        {},
        false,
      );
      if (
        signupUserApiRes &&
        signupUserApiRes?.status === SUCCESS_API_RESPONSE_CODE
      ) {
        return resolve(signupUserApiRes);
      } else {
        showPopupMessage({
          message: signupUserApiRes?.data?.data ?? 'Invalid details',
          type: 'error',
        });
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
export const getMyProfileFromDb = () => {
  return new Promise(async resolve => {
    try {
      const UserApiRes = await callApi(
        USER_ACTION_STACK + GET_PROFILE_DATA_ENDPOINT,
        API_METHOD.get,
      );

      if (UserApiRes) {
        return resolve(UserApiRes?.data);
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
