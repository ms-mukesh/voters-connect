import callApi from '@/src/utils/api';
import {
  GENERATE_OTP_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGIN_STACK,
  SIGNUP_API_REQ_TYPE,
  SIGNUP_USER_ENDPOINT,
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
      const signUpUserApiRes = await callApi(
        SIGNUP_USER_ENDPOINT,
        API_METHOD.post,
        obj,
        API_BASE_URL,
        awsAuthHeaderConfig,
      );
      if (signUpUserApiRes) {
        return resolve(signUpUserApiRes);
      } else {
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
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
