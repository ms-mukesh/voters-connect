import {createAxiosInstance} from '@/src/lib/axios';
import {API_BASE_URL} from '@/src/constant/envConfig.index';
import {handleResponse} from '@/src/utils/api/responseHandler';
import {API_METHOD} from '@/src/constant/network';
import {handleCatchError} from '@/src/utils/api/errorHandler';
import {getAuthToken} from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
const fetcher = async <T>(
  url: string,
  header = {},
  requireAuthToken = true,
) => {
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
  const axiosInstance = createAxiosInstance(reqHeader, API_BASE_URL);

  return axiosInstance
    .get<T>(url)
    .then(response => {
      return handleResponse(url, response, API_METHOD.get, false);
    })
    .catch(err => {
      return handleCatchError(url, err);
    });
};

export default fetcher;
