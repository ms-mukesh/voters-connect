import React, {useEffect, useState} from 'react';
import {
  AppCard,
  AppFabButton,
  Background,
  CustomFlatList,
  CustomText,
  EmptyScreen,
} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import {getElectionListFromDb} from '@/src/screens/modules/election/electionNetworkCall/election.network.index';
import {Pressable, StyleSheet, View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import PlaceHolder from '@/src/component/sections/placeHolder/placeHolder.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {getFormatedLastUpdatedDate} from '@/src/utils/utilityMethods/dateMethod/dateMethod.index';
const ElectionList = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const [electionList, setElectionList] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);
  const _setElectionList = async () => {
    setApiLoader(true);
    const electionListApiRes: any = await getElectionListFromDb();
    if (electionListApiRes) {
      setElectionList(electionListApiRes?.data ?? []);
    }
    setApiLoader(false);
  };

  const _openElectionDetailsPage = (item: any) => {
    const paramsObj = {
      electionDetails: item,
      headerTitle: 'Edit details',
      landedForEdit: true,
      refereshList: _setElectionList,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.addNewElection,
      paramsObj,
    );
  };

  const _renderElectionList = ({item}: any) => {
    return (
      <Pressable onPress={() => _openElectionDetailsPage(item)}>
        <View style={styleSheet.dividerViewRegular} />
        <AppCard>
          <View style={styleSheet.justifyContentView}>
            <CustomText style={[styleSheet.largeBold, styles.textView]}>
              {item?.ElectionName ?? ''}
            </CustomText>
            <CustomText style={[styleSheet.largeBold]}>
              {getFormatedLastUpdatedDate(item?.ElectionDate ?? '')}
            </CustomText>
          </View>
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.justifyContentView}>
            <CustomText style={[styleSheet.regularBold, styles.textView]}>
              {'Assembly: ' + item?.AssemblyName ?? ''}
            </CustomText>
            <CustomText style={[styleSheet.regularBold]}>
              {'Type: ' + item?.ElectionType ?? ''}
            </CustomText>
          </View>
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.justifyContentView}>
            <CustomText style={[styleSheet.regularBold, styles.textView]}>
              {'Loksabha: ' + item?.LoksabhaName ?? ''}
            </CustomText>
          </View>
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.justifyContentView}>
            <CustomText style={[styleSheet.regularBold, styles.textView]}>
              {'Officer: ' + item?.CommisionOfficer ?? ''}
            </CustomText>
          </View>
        </AppCard>
      </Pressable>
    );
  };
  const _renderPlaceHolder = () => {
    return <View style={[styleSheet.generalPlaceHolderView]} />;
  };
  const placeHolder = PlaceHolder({
    rows: 5,
    customView: _renderPlaceHolder(),
  });

  const _onPressAddButton = () => {
    const paramsObj = {
      landedForEdit: false,
      refereshList: _setElectionList,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.addNewElection,
      paramsObj,
    );
  };

  useEffect(() => {
    _setElectionList().then(() => {});
  }, []);

  return (
    <Background>
      <AppHeader
        navigation={props?.navigation ?? null}
        title={'Election List'}
      />
      <View style={styleSheet.contentMainView}>
        <View style={styleSheet.dividerViewRegular} />
        {electionList.length > 0 || apiLoader ? (
          <CustomFlatList
            data={electionList}
            apiLoader={apiLoader}
            placeHolder={placeHolder?.calculatedPlaceHolderView ?? null}
            renderItem={_renderElectionList}
          />
        ) : (
          <View>
            <EmptyScreen title={'No new election available'} />
          </View>
        )}
        <AppFabButton onPress={_onPressAddButton} />
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  textView: {
    flex: 1,
  },
});
export default ElectionList;
