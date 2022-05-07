import React, { useEffect, useMemo, useState } from 'react';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import { initAwsAuth } from '@/src/config/awsConfig.index';
import { getAuthToken } from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import { implementReplaceNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';
import { SPLASH_SCREEN_IMG } from '@/src/assets/images/svgIcons/introScreen/introScreen.index';
import { Image, StyleSheet } from 'react-native';
import { getValueFromAsyncStorage } from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import { ASYNC_STORAGE_CONST } from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
import { isAllFieldsValidFlag } from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
const Splashscreen = (props: any) => {
    const [initialRoute, setInitialRoute] = useState('');
    const calculatedInitialRoute = useMemo(() => {
        return initialRoute;
    }, [initialRoute]);
    useEffect(() => {
        async function fetchAccessToken() {
            try {
                await initAwsAuth();
                const isAllFieldsAreValidForLogin =
                    await getValueFromAsyncStorage(
                        ASYNC_STORAGE_CONST.allFieldsValidForLogin
                    );
                console.log(
                    'data---here--',
                    isAllFieldsAreValidForLogin,
                    typeof isAllFieldsAreValidForLogin,
                    isAllFieldsAreValidForLogin === isAllFieldsValidFlag
                );
                const accessToken = await getAuthToken();
                if (
                    accessToken &&
                    isAllFieldsAreValidForLogin === isAllFieldsValidFlag
                ) {
                    setInitialRoute(SCREEN_NAME.indexScreen);
                } else {
                    setInitialRoute(SCREEN_NAME.entrance);
                }
            } catch (ex) {
                setInitialRoute(SCREEN_NAME.entrance);
                if (__DEV__) {
                    console.log('error occurred');
                }
            }
        }
        fetchAccessToken()
            .then(() => {})
            .catch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isStringNotEmpty(calculatedInitialRoute)) {
            implementReplaceNavigation(
                props?.navigation ?? null,
                calculatedInitialRoute
            );
        }
    }, [initialRoute]); // eslint-disable-line react-hooks/exhaustive-deps
    const {} = props;
    return <Image style={styles.mainImage} source={SPLASH_SCREEN_IMG} />;
};
const styles = StyleSheet.create({
    mainImage: {
        height: '100%',
        width: '100%',
    },
});
export default Splashscreen;
