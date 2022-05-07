import { navigate, replace } from '@/src/navigation/rootNavigation';
import { CommonActions } from '@react-navigation/native';
import { isANDROID } from '@/src/utils/screenRatio';
import { NativeModules } from 'react-native';
const { AutoFillOtp } = NativeModules;
export const implementReplaceNavigation = (
    navigation: any,
    screenName = '',
    params = {}
) => {
    try {
        if (navigation === null) {
            replace(screenName, params);
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: screenName, params: {} }],
                })
            );
        }
    } catch (ex) {
        navigate(screenName, params);
    }
};
export const implementChangeCurrentStackNavigation = (
    navigation: any,
    screenName = '',
    params = {}
) => {
    try {
        if (navigation === null) {
            replace(screenName, params);
        } else {
            navigation?.replace(screenName, params);
        }
    } catch (ex) {
        navigate(screenName, params);
    }
};

export const implementStackNavigation = (
    navigation: any,
    screenName = '',
    params = {}
) => {
    try {
        if (navigation === null) {
            navigate(screenName, params);
        } else {
            navigation?.navigate(screenName, params);
        }
    } catch (ex) {
        navigate(screenName, params);
    }
};
export const implementGoBack = (navigation: any) => {
    try {
        navigation?.goBack();
    } catch (ex) {
        if (__DEV__) {
            console.log('failed to execute back event');
        }
    }
};
export const askForAutoFillOtpPermission = () => {
    if (isANDROID && AutoFillOtp !== null) {
        AutoFillOtp?.createAutoFillOtp();
    }
};
