import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import { navigate } from '@/src/navigation/rootNavigation';
import {
    isStringNotEmpty,
    isValueDefined,
} from '@/src/utils/utilityMethods/stringMethod.index';

export const navigateToScreen = (
    screenName: string,
    data: any,
    navigator: any,
    isFromQuitState = false
) => {
    if (isFromQuitState) {
        setTimeout(() => {
            navigator.navigate(screenName, { payload: data });
        }, 2000);
    } else {
        navigator.navigate(screenName);
    }
};
export const navigationForOtherScreen = (
    screenName = SCREEN_NAME.dashboard,
    data = {},
    isFromQuitState = false
) => {
    if (isFromQuitState) {
        setTimeout(() => {
            navigate(screenName, data);
        }, 10000);
    } else {
        navigate(screenName, data);
    }
};
export const gotToNavigationScreen = (data: any) => {
    let params = {};
    let page = SCREEN_NAME.dashboard;
    const notificationReadObj = {
        messageId: data?.message_id ?? '',
        createdDate: isStringNotEmpty(data?.created_date)
            ? parseInt(data?.created_date)
            : '',
    };
    console.log('payload data--', notificationReadObj);
    if (isValueDefined(data?.params)) {
        console.log('data--', data);
        let paramData = JSON.parse(data?.params);
        let pageName = paramData?.page ?? SCREEN_NAME.dashboard;
        console.log('data--', paramData, pageName);
        navigationForOtherScreen(pageName, paramData);
        return;
    }
    navigationForOtherScreen(page, params);
};
