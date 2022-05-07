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
import {addBulkVoterListInDb} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
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
  const dashboardMenu = [
    {title: 'Voter list', icon: VOTER_LIST, callback: _onPressVoterList},
    {title: 'Add Voter', icon: ADD_VOTER, callback: _addBulkData},
  ];
  const _renderDashboardMenu = ({item}: any) => {
    return (
      <AppCard width={wp(40)}>
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
    );
  };
  return (
    <Background>
      <Loader isLoading={apiLoader} />
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
