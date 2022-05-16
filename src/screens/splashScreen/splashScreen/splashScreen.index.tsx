import React, {useEffect, useMemo, useState} from 'react';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {initAwsAuth} from '@/src/config/awsConfig.index';
import {getAuthToken} from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import {implementReplaceNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import {SPLASH_SCREEN_IMG} from '@/src/assets/images/svgIcons/introScreen/introScreen.index';
import {Image, StyleSheet} from 'react-native';
import {getValueFromAsyncStorage} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import {ASYNC_STORAGE_CONST} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
import {getFilterKeywordFromDb} from '@/src/screens/modules/election/electionNetworkCall/election.network.index';
import {UseAppDispatch} from '@/src/lib/reduxToolkit/hooks';
import {addFilterKeyData} from '@/src/lib/reduxToolkit/reducers/userProfile/UserProfileSlice';
const Splashscreen = (props: any) => {
  const [initialRoute, setInitialRoute] = useState('');
  const dispatch = UseAppDispatch();
  const calculatedInitialRoute = useMemo(() => {
    return initialRoute;
  }, [initialRoute]);
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        await initAwsAuth();
        await getValueFromAsyncStorage(
          ASYNC_STORAGE_CONST.allFieldsValidForLogin,
        );
        const accessToken = await getAuthToken();
        console.log('here-=-', accessToken);
        const filterKey: any = await getFilterKeywordFromDb();
        if (filterKey) {
          dispatch(addFilterKeyData(filterKey?.data ?? null));
        }
        if (accessToken) {
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
        calculatedInitialRoute,
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
