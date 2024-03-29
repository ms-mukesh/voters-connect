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
import {executeLogout} from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
const Account = (props: any) => {
  const {} = props;
  const {data}: any = UseAppSelector(state => state.profile);
  const dispatch = UseAppDispatch();
  const styleSheet = StyleSheetSelection();
  const _setMyProfileData = async () => {
    const profileData: any = await getMyProfileFromDb();
    if (profileData) {
      dispatch(addProfile(profileData?.data ?? null));
    }
  };
  const _onPressEdit = () => {
    const paramsObj = {
      voterDetails: data,
      refereshList: _setMyProfileData,
      headerTitle: 'Edit Profile',
      landedToEditMyProfile: true,
    };
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
                {'Mandal Name: '}
                <CustomText>{data?.mandalName ?? 'NA'}</CustomText>
              </CustomText>
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.largeSemiBold}>
                {'Shakti kendra: '}
                <CustomText>{data?.shaktiKendraName ?? 'NA'}</CustomText>
              </CustomText>
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.largeSemiBold}>
                {'Booth: '}
                <CustomText> {data?.boothId ?? 'NA'}</CustomText>
              </CustomText>
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.largeSemiBold}>
                {'Gender: '}
                <CustomText> {data?.gender ?? 'NA'}</CustomText>
              </CustomText>
              <View style={styleSheet.dividerView} />
            </AppCard>
            <View style={styleSheet.dividerViewRegular} />
            <Pressable onPress={executeLogout}>
              <AppCard>
                <CustomText style={styleSheet.xLargeBold}>Log out</CustomText>
              </AppCard>
            </Pressable>
          </View>
        )}
      </View>
    </Background>
  );
};
export default Account;
