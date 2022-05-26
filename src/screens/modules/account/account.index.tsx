import React, {useEffect} from 'react';
import {AppCard, Background, CustomText} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import {getMyProfileFromDb} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import {Pressable, View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {UseAppDispatch, UseAppSelector} from '@/src/lib/reduxToolkit/hooks';
import {addProfile} from '@/src/lib/reduxToolkit/reducers/profile/ProfileSlice';
import CircularImage from '@/src/component/common/circularImage/circularImage.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
const Account = (props: any) => {
  const {} = props;
  const {data}: any = UseAppSelector(state => state.profile);
  console.log('data--', data);
  const dispatch = UseAppDispatch();
  const styleSheet = StyleSheetSelection();
  const _setMyProfileData = async () => {
    const profileData: any = await getMyProfileFromDb();
    if (profileData) {
      dispatch(addProfile(profileData?.data ?? null));
    }
  };
  const _onPressEdit = () => {
    const paramsObj = {voterDetails: data, refereshList: _setMyProfileData};
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.voterDetails,
      paramsObj,
    );
  };
  useEffect(() => {
    _setMyProfileData().then(() => {});
  }, []);
  return (
    <Background>
      <AppHeader requireBackArrow={false} leftIcon={null} title={'Account'} />
      <View style={styleSheet.contentMainView}>
        {data === null ? (
          <CustomText style={styleSheet.mediumLargeBold}>
            Profile Details not available
          </CustomText>
        ) : (
          <View>
            <AppCard>
              <View style={styleSheet.centerValue}>
                <Pressable
                  onPress={_onPressEdit}
                  style={{alignSelf: 'flex-end'}}>
                  <CustomText style={styleSheet.regularBold}>Edit</CustomText>
                </Pressable>
                <CircularImage />
                <View style={styleSheet.dividerViewRegular} />
                <CustomText style={styleSheet.largeSemiBold}>
                  {data?.voterName ?? ''}
                </CustomText>
                <View style={styleSheet.dividerView} />
                <CustomText style={styleSheet.largeSemiBold}>
                  {data?.phoneNumber ?? ''}
                </CustomText>
                <View style={styleSheet.dividerView} />
                <CustomText style={styleSheet.largeSemiBold}>
                  {data?.electionId ?? ''}
                </CustomText>
              </View>
            </AppCard>
            <View style={styleSheet.dividerViewRegular} />
            <AppCard>
              <CustomText style={styleSheet.largeSemiBold}>
                {'Mandal Name: ' + data?.mandalName ?? ''}
              </CustomText>
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.largeSemiBold}>
                {'Shakti kendra: ' + data?.shaktiKendraName ?? ''}
              </CustomText>
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.largeSemiBold}>
                {'Booth: ' + data?.boothId ?? ''}
              </CustomText>
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.largeSemiBold}>
                {'Gender: ' + data?.gender ?? ''}
              </CustomText>
              <View style={styleSheet.dividerView} />
            </AppCard>
          </View>
        )}
      </View>
    </Background>
  );
};
export default Account;
