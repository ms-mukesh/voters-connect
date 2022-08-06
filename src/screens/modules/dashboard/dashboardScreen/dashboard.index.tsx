import React, {useEffect, useState} from 'react';
import {
  AppCard,
  Background,
  CustomFlatList,
  CustomText,
  Loader,
  ProgressBar,
} from '@/src/component/common';
import {StyleSheet, View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {extractDataFromExcel} from '@/src/utils/utilityMethods/fileMethod/fileMethod.index';
import {
  addBulkVoterListInDb,
  GetDashboardDetails,
} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {AppHeader} from '@/src/component/section.index';
import {color, textColor} from '@/src/utils/color';
import DashboardCard from '@/src/screens/modules/dashboard/dashboardScreen/dashboardCard.index';
import {GET_DASHBOARD_DETAILS} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.const';
import {hp} from '@/src/utils/screenRatio';
const Dashboard = (props: any) => {
  const styleSheet = StyleSheetSelection();
  const localStyle = StyleSheet.create({
    titleText: {
      ...styleSheet.largeSemiBold,
      color: textColor.secondary,
    },
    fieldDivider: {
      ...styleSheet.dividerViewRegular,
    },
    divider: {
      ...styleSheet.dividerView,
    },
  });
  const [apiLoader, setApiLoader] = useState(false);
  const {data, loading, error, mutate}: any = GetDashboardDetails();
  const [dashboardDetails, setDashboardDetails]: any = useState(null);
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

  const _onPressBroadCastMessage = () => {
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.broadCastMessage,
    );
  };
  const _onPressElectionList = () => {
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.electionList,
    );
  };
  // const _onPressVolunteerList = () => {
  //   implementStackNavigation(
  //     props?.navigation ?? null,
  //     SCREEN_NAME.volunteerList,
  //   );
  // };
  // const dashboardMenu = [
  //   {title: 'Voter list', icon: VOTER_LIST, callback: _onPressVoterList},
  //   {title: 'Add Voter', icon: ADD_VOTER, callback: _addBulkData},
  //   {title: 'Election List', icon: ADD_VOTER, callback: _onPressElectionList},
  //   {title: 'Volunteer List', icon: ADD_VOTER, callback: _onPressVolunteerList},
  // ];
  // const _renderDashboardMenu = ({item}: any) => {
  //   return (
  //     <View>
  //       <View style={styleSheet.dividerViewRegular} />
  //       <AppCard width={wp(42)}>
  //         <Pressable onPress={item?.callback ?? null}>
  //           <Image
  //             resizeMode={'contain'}
  //             style={styles.iconImage}
  //             source={item?.icon}
  //           />
  //           <View style={styleSheet.dividerViewRegular} />
  //           <CustomText
  //             style={[styleSheet.mediumLargeBold, {alignSelf: 'center'}]}>
  //             {item?.title ?? ''}
  //           </CustomText>
  //         </Pressable>
  //       </AppCard>
  //     </View>
  //   );
  // };

  useEffect(() => {
    if (data && !error) {
      setDashboardDetails(data?.data ?? null);
    } else {
      setDashboardDetails(null);
    }
  }, [data, error]);

  const _renderMainContent = () => {
    return (
      <View style={[styleSheet.contentMainView]}>
        <View style={styleSheet.justifyContentView}>
          <DashboardCard
            width={'45%'}
            backgroundColor={color.cardBackground}
            title={'Available Families'}
            subTitle={dashboardDetails?.familyDetails ?? 0}
            onPressCard={_onPressVoterList}
          />
          <DashboardCard
            width={'45%'}
            backgroundColor={color.cardBackground}
            title={'Active Elections'}
            subTitle={dashboardDetails?.electionDetails ?? 0}
            onPressCard={_onPressElectionList}
          />
        </View>
        <View style={styleSheet.dividerViewRegular} />
        <DashboardCard
          onPressCard={_addBulkData}
          title={'Import data from CSV/EXCEL'}
          backgroundColor={color.light_background}
        />
        <View style={styleSheet.dividerViewRegular} />
        <DashboardCard
          onPressCard={_onPressBroadCastMessage}
          title={'Broadcast Message'}
          backgroundColor={color.light_background}
        />
        <View style={styleSheet.dividerViewRegular} />

        <CustomText style={localStyle.titleText}>Gender Ratio</CustomText>
        <View style={localStyle.divider} />
        <AppCard>
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.genderRatio[0]?.count ?? 0}
            rightText={'Male'}
            percentage={
              (dashboardDetails?.genderRatio[0]?.count * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.genderRatio[1]?.count ?? 0}
            rightText={'Female'}
            percentage={
              (dashboardDetails?.genderRatio[1]?.count * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.genderRatio[2]?.count ?? 0}
            rightText={'Other'}
            percentage={
              (dashboardDetails?.genderRatio[2]?.count * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
        </AppCard>
        <View style={styleSheet.dividerViewRegular} />
        <CustomText style={localStyle.titleText}>Age Ratio</CustomText>
        <View style={localStyle.divider} />
        <AppCard>
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.plus18tp35Members?.length ?? 0}
            rightText={'18-35'}
            percentage={
              (dashboardDetails?.plus18tp35Members?.length * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.plus36tp50Members?.length ?? 0}
            rightText={'36-50'}
            percentage={
              (dashboardDetails?.plus36tp50Members?.length * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.plus50Member?.length ?? 0}
            rightText={'50+'}
            percentage={
              (dashboardDetails?.plus50Member?.length * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            countPercentage={false}
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={
              dashboardDetails?.correctAgeNotAvailableMember?.length ?? 0
            }
            rightText={'In proper age'}
            percentage={
              (dashboardDetails?.correctAgeNotAvailableMember?.length * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
        </AppCard>
        <View style={styleSheet.dividerViewRegular} />
        <CustomText style={localStyle.titleText}>Support Ratio</CustomText>
        <View style={localStyle.divider} />
        <AppCard>
          <ProgressBar
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.voterCategoryRatio[1]?.count ?? 0}
            rightText={'In-support'}
            barColor={color.green}
            percentage={
              (dashboardDetails?.voterCategoryRatio[1]?.count * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.voterCategoryRatio[0]?.count ?? 0}
            rightText={'Against'}
            barColor={color.red}
            percentage={
              (dashboardDetails?.voterCategoryRatio[0]?.count * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
          <View style={localStyle.fieldDivider} />
          <ProgressBar
            total={dashboardDetails?.totalMember[0].totalMember ?? 0}
            completed={dashboardDetails?.voterCategoryRatio[2]?.count ?? 0}
            rightText={'Un-Predictable'}
            barColor={color.yellow}
            percentage={
              (dashboardDetails?.voterCategoryRatio[2]?.count * 100) /
              dashboardDetails?.totalMember[0]?.totalMember
            }
          />
        </AppCard>

        <View style={styleSheet.dividerViewLarge} />
        {/*<CustomFlatList*/}
        {/*  neededEmptyScreen={false}*/}
        {/*  numColumns={2}*/}
        {/*  data={dashboardMenu}*/}
        {/*  renderItem={_renderDashboardMenu}*/}
        {/*  contentContainerStyle={styles.flatList}*/}
        {/*  columnWrapperStyle={styles.flatListWrapper}*/}
        {/*/>*/}
      </View>
    );
  };
  const flatListData = [
    {
      content: _renderMainContent,
    },
  ];
  const _renderItems = ({item}: any) => {
    return item?.content() ?? null;
  };
  const _onReferesh = async () => {
    await mutate(GET_DASHBOARD_DETAILS);
  };
  return (
    <Background>
      <Loader isLoading={loading} />
      <Loader isLoading={apiLoader} />
      <AppHeader requireBackArrow={false} title={'Dashboard'} />
      <CustomFlatList
        onReferesh={_onReferesh}
        data={flatListData}
        renderItem={_renderItems}
        contentContainerStyle={{paddingBottom: hp(0)}}
        neededEmptyScreen={false}
      />
    </Background>
  );
};
// const styles = StyleSheet.create({
//   iconImage: {
//     height: hp(14),
//     width: '100%',
//   },
//   flatList: {
//     paddingBottom: hp(20),
//   },
//   flatListWrapper: {
//     justifyContent: 'space-between',
//   },
// });
export default Dashboard;
