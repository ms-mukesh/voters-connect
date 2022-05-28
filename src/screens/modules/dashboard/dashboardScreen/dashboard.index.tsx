import React, {useState} from 'react';
import {
  AppCard,
  Background,
  CustomFlatList,
  CustomText,
  Loader,
} from '@/src/component/common';
import {ADD_VOTER, VOTER_LIST} from '@/src/assets/images/pngIcons';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {hp, wp} from '@/src/utils/screenRatio';
import {extractDataFromExcel} from '@/src/utils/utilityMethods/fileMethod/fileMethod.index';
import {addBulkVoterListInDb} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {AppHeader} from '@/src/component/section.index';
const Dashboard = (props: any) => {
  const styleSheet = StyleSheetSelection();
  const [apiLoader, setApiLoader] = useState(false);

  const _onPressVoterList = () => {
    implementStackNavigation(props?.navigation ?? null, SCREEN_NAME.voterList);
  };
  const _addBulkData = async () => {
    setApiLoader(true);
    const excelData = await extractDataFromExcel();
    if (excelData) {
      await addBulkVoterListInDb(excelData);
    }
    setApiLoader(false);
  };
  const _onPressElectionList = () => {
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.electionList,
    );
  };
  const _onPressVolunteerList = () => {
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.volunteerList,
    );
  };
  const dashboardMenu = [
    {title: 'Voter list', icon: VOTER_LIST, callback: _onPressVoterList},
    {title: 'Add Voter', icon: ADD_VOTER, callback: _addBulkData},
    {title: 'Election List', icon: ADD_VOTER, callback: _onPressElectionList},
    {title: 'Volunteer List', icon: ADD_VOTER, callback: _onPressVolunteerList},
  ];
  const _renderDashboardMenu = ({item}: any) => {
    return (
      <View>
        <View style={styleSheet.dividerViewRegular} />
        <AppCard width={wp(42)}>
          <Pressable onPress={item?.callback ?? null}>
            <Image
              resizeMode={'contain'}
              style={styles.iconImage}
              source={item?.icon}
            />
            <View style={styleSheet.dividerViewRegular} />
            <CustomText
              style={[styleSheet.mediumLargeBold, {alignSelf: 'center'}]}>
              {item?.title ?? ''}
            </CustomText>
          </Pressable>
        </AppCard>
      </View>
    );
  };
  return (
    <Background>
      <Loader isLoading={apiLoader} />
      <AppHeader requireBackArrow={false} title={'Dashboard'} />
      <View style={[styleSheet.contentMainView]}>
        <View style={styleSheet.dividerViewRegular} />
        <CustomFlatList
          neededEmptyScreen={false}
          numColumns={2}
          data={dashboardMenu}
          renderItem={_renderDashboardMenu}
          contentContainerStyle={styles.flatList}
          columnWrapperStyle={styles.flatListWrapper}
        />
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  iconImage: {
    height: hp(14),
    width: '100%',
  },
  flatList: {
    paddingBottom: hp(20),
  },
  flatListWrapper: {
    justifyContent: 'space-between',
  },
});
export default Dashboard;
