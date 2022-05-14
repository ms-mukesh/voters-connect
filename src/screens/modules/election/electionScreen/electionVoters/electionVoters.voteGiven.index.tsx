import React, {useEffect, useState} from 'react';
import {
  AppButton,
  AppSearchBar,
  Background,
  CustomFlatList,
  CustomText,
  Loader,
} from '@/src/component/common';
import {
  isStringNotEmpty,
  isValueDefined,
} from '@/src/utils/utilityMethods/stringMethod.index';
import {getVoterListByElectionIdFromDb} from '@/src/screens/modules/election/electionNetworkCall/election.network.index';
import {VOTER_STATUS} from '@/src/screens/modules/election/electionNetworkCall/election.network.const';
import {hp, wp} from '@/src/utils/screenRatio';
import VoterCard from '@/src/screens/modules/voterList/voterListCommon/voterCard.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {StyleSheet, View} from 'react-native';
import PlaceHolder from '@/src/component/sections/placeHolder/placeHolder.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
const ElectionVotersVoteGiven = (props: any) => {
  const {electionDetails = null} = props;
  const [apiLoader, setApiLoader] = useState(false);
  const [voterList, setVoterList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const styleSheet = StyleSheetSelection();
  const _setVoterListFromDb = async (
    electionId = electionDetails?.ElectionMasterId ?? 0,
    searchTextKey = '',
  ) => {
    setApiLoader(true);
    const voterListApiRes: any = await getVoterListByElectionIdFromDb(
      electionId,
      VOTER_STATUS.isVoted,
      searchTextKey,
    );
    if (voterListApiRes) {
      setVoterList(voterListApiRes?.data ?? []);
    }
    setApiLoader(false);
  };

  useEffect(() => {
    if (electionDetails !== null) {
      if (
        isValueDefined(electionDetails?.ElectionMasterId) &&
        isStringNotEmpty(electionDetails?.ElectionMasterId)
      ) {
        _setVoterListFromDb(electionDetails?.ElectionMasterId).then(() => {});
      }
      // console.log(electionDetails);
    }
  }, [electionDetails]);
  const _refereshList = async () => {
    await _setVoterListFromDb(electionDetails?.ElectionMasterId ?? 0);
  };
  const _renderPlaceHolder = () => {
    return <View style={[styleSheet.generalPlaceHolderView]} />;
  };
  const placeHolder = PlaceHolder({
    rows: 5,
    customView: _renderPlaceHolder(),
  });
  const _onReferesh = async () => {
    setSearchText('');
    _setVoterListFromDb(electionDetails?.ElectionMasterId ?? 0).then(() => {});
  };

  const _navigateToVoterDetails = (item: any) => {
    const paramsObj = {
      voterDetails: item,
      refereshList: _refereshList,
      fromVoterList: true,
      electionId: electionDetails?.ElectionMasterId ?? 0,
      isVoted: true,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.voterDetails,
      paramsObj,
    );
  };

  const _renderVoterList = ({item}: any) => {
    return (
      <VoterCard
        onPressCard={() => _navigateToVoterDetails(item)}
        data={item}
      />
    );
  };
  const _clearSearchText = () => {
    setSearchText('');
    _setVoterListFromDb().then(() => {});
  };
  const _onChangeSearchText = async (e: any) => {
    setSearchText(e?.nativeEvent?.text ?? '');
    await _setVoterListFromDb(
      electionDetails?.ElectionMasterId ?? 0,
      e?.nativeEvent?.text ?? '',
    );
  };
  const _onPressFilter = () => {
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.appFilterScreen,
    );
  };

  return (
    <Background>
      <Loader isLoading={apiLoader} />
      <AppSearchBar
        onPressClear={_clearSearchText}
        value={searchText}
        onChange={_onChangeSearchText}
      />
      <View style={styleSheet.dividerViewRegular} />
      <View
        style={[
          styleSheet.justifyContentView,
          {width: '85%', alignSelf: 'center'},
        ]}>
        <CustomText style={styleSheet.regularBold}>
          want to filter? click here
        </CustomText>
        <AppButton
          title={'Filter'}
          onPress={_onPressFilter}
          containerStyle={styles.filterButton}
        />
      </View>
      <View style={styleSheet.dividerView} />

      <CustomFlatList
        data={voterList}
        renderItem={_renderVoterList}
        contentContainerStyle={{paddingBottom: hp(40)}}
        placeHolder={placeHolder?.calculatedPlaceHolderView ?? null}
        apiLoader={apiLoader}
        onReferesh={_onReferesh}
        emptyScreenTitle={'No Voter has given vote till now'}
      />
    </Background>
  );
};
const styles = StyleSheet.create({
  filterButton: {
    width: wp(40),
    marginTop: 0,
    height: hp(5.5),
  },
});
export default ElectionVotersVoteGiven;
