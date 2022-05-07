import { showPopupMessage } from '@/src/utils/localPopup';
import { Auth } from 'aws-amplify';
import { INVALID_CREDS } from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import { implementReplaceNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import {
    removeValueFromAsyncStore,
    setValueInAsyncStorage,
} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import { ASYNC_STORAGE_CONST } from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
import { DEFAULT_PWD } from '@/src/config/awsConfig.index';
export const cognitoLogin = (phoneNumber = '', password = DEFAULT_PWD) => {
    return new Promise((resolve) => {
        try {
            const loginObj = {
                username: phoneNumber + '',
                password: password,
            };
            // @ts-ignore
            Auth.signIn(loginObj)
                .then((user: any) => {
                    return resolve({ success: true, data: user });
                })
                .catch((err: any) => {
                    if (
                        err.code === 'UserLambdaValidationException' ||
                        err.code === 'InvalidLambdaResponseException'
                    ) {
                        showPopupMessage({
                            message: 'Mobile number not Exist, Please Sign up',
                            type: 'info',
                        });
                    }
                    if (err.code === 'NotAuthorizedException') {
                        showPopupMessage({
                            message: INVALID_CREDS,
                            type: 'info',
                        });
                    }
                    return resolve({
                        success: false,
                        data: err,
                        code: err.code,
                    });
                });
        } catch (ex) {
            showPopupMessage({});
            return resolve(false);
        }
    });
};

export const getAuthToken = async () => {
    try {
        const data = await Auth.currentSession();
        return data.getIdToken().getJwtToken();
    } catch (ex) {
        return null;
    }
};
export const createNewUserOnCognito = (
    phoneNumber = '',
    password = ''
    // userName = ''
) => {
    return new Promise((resolve) => {
        try {
            Auth.signUp({
                username: phoneNumber,
                password: password,
            })
                .then(async (data) => {
                    if (data) {
                        return resolve(data);
                        // const registerUserInDbRes = await signupUserFromApi(
                        //     COUNTRY_CODE + phoneNumber,
                        //     userName
                        // );
                        // if (registerUserInDbRes) {
                        //     return resolve(data);
                        // } else {
                        //     return resolve(false);
                        // }
                    } else {
                        if (__DEV__) {
                            console.log(
                                'error while checking check Presiged Cognito --',
                                data
                            );
                        }
                        showPopupMessage({});
                        return resolve(false);
                    }
                })
                .catch((err) => {
                    if (__DEV__) {
                        console.log(
                            'error while checking check Presiged Cognito catch --',
                            err
                        );
                    }
                    if (err.code === 'UsernameExistsException') {
                        showPopupMessage({
                            message: 'User already exist, please do login',
                            type: 'info',
                        });
                    } else {
                        showPopupMessage({});
                    }
                    return resolve(false);
                });
        } catch (ex) {
            if (__DEV__) {
                console.log(
                    'error while checking check Presiged Cognito exception --',
                    ex
                );
            }
            showPopupMessage({});
            return resolve(false);
        }
    });
};
export const executeLogout = async () => {
    try {
        await Auth.signOut({ global: true });
        await removeValueFromAsyncStore(ASYNC_STORAGE_CONST.accessToken);
        await removeValueFromAsyncStore(
            ASYNC_STORAGE_CONST.allFieldsValidForLogin
        );
        implementReplaceNavigation(null, SCREEN_NAME.entrance);
    } catch (ex) {
        implementReplaceNavigation(null, SCREEN_NAME.entrance);
    }
};
export const setupPrimaryLoginInformation = async () => {
    try {
        const jwtToken: any = await getAuthToken();
        await setValueInAsyncStorage(ASYNC_STORAGE_CONST.accessToken, jwtToken);
        return true;
    } catch (ex) {
        return false;
    }
};
export const completeLoginFlowIndicator = async () => {
    await setValueInAsyncStorage(
        ASYNC_STORAGE_CONST.allFieldsValidForLogin,
        JSON.stringify(true)
    );
};
