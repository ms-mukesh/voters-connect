import Config from 'react-native-config';
export const BASE_URL = Config.API_BASE_URL;
// export const GET = 'get';
// export const POST = 'post';
// export const PUT = 'put';
// export const PATCH = 'patch';
// export const DELETE = 'delete';
export const API_TIMEOUT = 10000;
export enum VALID_METHODS {
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
}
