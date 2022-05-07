import Config from 'react-native-config';
export const {
  ENV_NAME,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
  REGION,
  X_API_KEY,
} = Config;

export const API_BASE_URL = 'http://192.168.0.4:3000/';
export const SUCCESS_API_RESPONSE_CODE = 200;

export const AVAILABLE_ENV_NAMES = {
  dev: 'Dev',
  test: 'Test',
  prod: 'Prod',
};
