export const GENERATE_OTP_ENDPOINT = '/v1/otp';
export const VERIFY_OTP_ENDPOINT = '/v1/verifyotp';
export const SIGNUP_USER_ENDPOINT = '/v1/signup';
export interface SIGNUP_API_REQ_TYPE {
    name: string;
    phone_number: string;
    email: string;
    password: string;
}
