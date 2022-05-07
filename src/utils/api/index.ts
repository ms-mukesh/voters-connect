import {handleCatchError} from './errorHandler';
import {handleResponse} from './responseHandler';
import {checkInternetConnectivity} from '@/src/utils/internetConnection';
import {createAxiosInstance} from '@/src/lib/axios';
import {
  API_METHOD,
  NO_INTERNET,
  NO_INTERNET_CODE,
} from '@/src/constant/network';
import {API_BASE_URL} from '@/src/constant/envConfig.index';
import {getAuthToken} from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';

// type APIOptions = {
//   type?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
//   data?: Record<string, any>;
//   header?: Record<string, any>;
//   baseUrl?: string;
//   requireAuthToken?:boolean
// };

const callApi = async <T>(
  url: string,
  type = API_METHOD.get,
  data = {},
  baseUrl = API_BASE_URL,
  header = {},
  requireAuthToken = true,
  neededToastMessage = true,
) => {
  // @ts-ignore
  return checkInternetConnectivity().then(async isInternetConnected => {
    if (isInternetConnected) {
      let authToken = '';
      if (requireAuthToken) {
        // @ts-ignore
        authToken = await getAuthToken();
      }
      const reqHeader = Object.assign(header, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: isStringNotEmpty(authToken) ? authToken : '',
      });
      const axiosInstance = createAxiosInstance(reqHeader, baseUrl);
      if (__DEV__) {
        console.log('API URL - ', url);
      }
      switch (type) {
        case 'GET':
          return axiosInstance
            .get<T>(url)
            .then(response => {
              return handleResponse(url, response, type);
            })
            .catch(err => {
              return handleCatchError(url, err);
            });

        case 'POST':
          return axiosInstance
            .post<T>(url, data)
            .then(response => {
              return handleResponse(url, response, type, neededToastMessage);
            })
            .catch(err => {
              return handleCatchError(url, err);
            });

        case 'PUT':
          return axiosInstance
            .put<T>(url, data)
            .then(response => {
              return handleResponse(url, response, type, neededToastMessage);
            })
            .catch(err => {
              return handleCatchError(url, err);
            });

        case 'DELETE':
          return axiosInstance
            .delete<T>(url)
            .then(response => {
              return handleResponse(url, response, type, neededToastMessage);
            })
            .catch(err => {
              return handleCatchError(url, err);
            });

        case 'PATCH':
          return axiosInstance
            .patch<T>(url, data)
            .then(response => {
              return handleResponse(url, response, type, neededToastMessage);
            })
            .catch(err => {
              return handleCatchError(url, err);
            });
      }
    } else {
      return Promise.reject({
        message: NO_INTERNET,
        code: NO_INTERNET_CODE,
      });
    }
  });
};

export default callApi;
