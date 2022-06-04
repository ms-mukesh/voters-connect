import {Auth} from 'aws-amplify';

const awsConfig = {
  Auth: {
    region: '',
    userPoolId: '',
    userPoolWebClientId: '',
  },
};
const awsAuthHeaderConfig = {
  'x-api-key': '',
  'Content-Type': 'application/json',
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
export {awsConfig, awsAuthHeaderConfig, generateOtpPurpose, verifyOtpPurpose};
