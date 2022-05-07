import Config from 'react-native-config';
export const {
    ENV_NAME,
    USER_POOL_ID,
    USER_POOL_WEB_CLIENT_ID,
    API_BASE_URL,
    REGION,
    X_API_KEY,
} = Config;

export const AVAILABLE_ENV_NAMES = {
    dev: 'Dev',
    test: 'Test',
    prod: 'Prod',
};
