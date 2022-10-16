import axiosInstance from 'axios';
import {API_TIMEOUT, BASE_URL} from '@/src/constant/api-config';

const axios = axiosInstance.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axios;

export const createAxiosInstance = (reqHeader: any, baseUrl = BASE_URL) => {
  return axiosInstance.create({
    baseURL: baseUrl,
    headers: reqHeader,
    timeout: API_TIMEOUT,
  });
};
