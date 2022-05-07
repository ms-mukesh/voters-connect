import {
    USER_POOL_ID,
    USER_POOL_WEB_CLIENT_ID,
    API_BASE_URL,
    REGION,
    X_API_KEY,
} from '@/src/constant/envConfig.index';
import { Auth } from 'aws-amplify';

const awsConfig = {
    Auth: {
        region: REGION,
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
    },
};
const awsAuthHeaderConfig = {
    'x-api-key': X_API_KEY,
    'Content-Type': 'application/json',
};

const awsBaseURL = API_BASE_URL;
const awsAuthTypes = {
    signIn: 'SignIn',
    signUp: 'SignUp',
    reSend: 'ReSend',
};

const generateOtpPurpose = {
    resend: 'resend',
    login: 'login',
    signup: 'signup',
    email: 'email_otp',
};

const verifyOtpPurpose = {
    phoneNumber: 'sms_otp',
    emailId: 'email_otp',
};
export const initAwsAuth = () => {
    Auth.configure(awsConfig);
};
export const DEFAULT_PWD = 'Fibona$12';
export {
    awsConfig,
    awsBaseURL,
    awsAuthTypes,
    awsAuthHeaderConfig,
    generateOtpPurpose,
    verifyOtpPurpose,
};
