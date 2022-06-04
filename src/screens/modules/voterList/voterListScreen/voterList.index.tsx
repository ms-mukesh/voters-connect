import React, {useEffect, useState, useMemo} from 'react';
import {
  AppSearchBar,
  Background,
  CustomFlatList,
  CustomText,
} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {StyleSheet, View} from 'react-native';
import {
  getFilteredVoterDetailsFromDb,
  getVoterListFromDb,
} from '@/src/screens/modules/voterList/voterListNetworkCall/voterList.network';
import {
  implementStackNavigation,
  validateUpdatePageNumber,
} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import PlaceHolder from '@/src/component/sections/placeHolder/placeHolder.index';
import {hp, wp} from '@/src/utils/screenRatio';
import VoterCard from '@/src/screens/modules/voterList/voterListCommon/voterCard.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {textColor} from '@/src/utils/color';
import FabButton from '@/src/component/common/fabButton/fabButton.index';
import {FILTER_ICON} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
// import Slider from '@react-native-community/slider';
const VoterList = (props: any) => {
  const {} = props;
  const PAGE_LIMIT = 7;
  const [voterList, setVoterList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [filterSearchData, setFilterSearchData] = useState([]);
  // const [selectedAge, setSelectedAge]: any = useState(1);
  const styleSheet = StyleSheetSelection();

  const calculatedPageNo = useMemo(() => {
    return pageNo;
  }, [pageNo]);
  const calculatedTotalCount = useMemo(() => {
    return totalCount;
  }, [totalCount]);

  const calculatedLoading = useMemo(() => {
    return loading;
  }, [loading]);
  const calculatedBottomLoading = useMemo(() => {
    return bottomLoading;
  }, [bottomLoading]);

  const _reInitliseLoader = () => {
    setLoading(false);
    setBottomLoading(false);
  };
  const _onChangeSearchText = async (e: any) => {
    setSearchText(e?.nativeEvent?.text ?? '');
    if (isFilterOn) {
      const newArray = filterData.filter(function (el: any) {
        return (
          el?.boothId
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text ?? '') >= 0 ||
          el?.voterName
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.gender
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.voterCategory
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.electionId
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.village
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.dob
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.familyNumber
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.mandalName
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.shaktiKendraName
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >=
            0 ||
          el?.phoneNumber
            ?.toString()
            ?.toLowerCase()
            .indexOf(e?.nativeEvent?.text?.toString()?.toLowerCase() ?? '') >= 0
        );
      });
      setFilterSearchData([...newArray]);
    } else {
      setPageNo(1);
      await _setVoterListFromDb(
        1,
        true,
        false,
        PAGE_LIMIT,
        e?.nativeEvent?.text ?? '',
      );
    }
  };
  const _setVoterListFromDb = async (
    pageNoLocal = calculatedPageNo,
    requireLoader = true,
    requireBottomLoader = false,
    limit = PAGE_LIMIT,
    searchKey = '',
    minAge = 1,
    maxAge = 150,
  ) => {
    setLoading(requireLoader);
    setBottomLoading(requireBottomLoader);
    // @ts-ignore
    const voterListApiRes: any = await getVoterListFromDb(
      pageNoLocal,
      limit,
      searchKey,
      minAge,
      maxAge,
    );
    if (voterListApiRes) {
      setMaleCount(voterListApiRes?.maleCount ?? 0);
      setFemaleCount(voterListApiRes?.femaleCount ?? 0);
      setOtherCount(voterListApiRes?.otherCount ?? 0);
      setTotalCount(voterListApiRes?.count ?? 0);
      if (pageNoLocal === 1) {
        setVoterList(voterListApiRes?.data ?? []);
      } else {
        const {data = []} = voterListApiRes;
        // @ts-ignore
        setVoterList([...voterList, ...data]);
      }
    } else {
      setVoterList([]);
    }
    _reInitliseLoader();
  };
  const _updatePageNo = async (
    pageNoLocal = 1,
    requireLoader = true,
    requireBottomLoader = false,
  ) => {
    if (
      validateUpdatePageNumber(
        voterList?.length,
        calculatedTotalCount,
        pageNoLocal,
      )
    ) {
      setPageNo(pageNoLocal);
      await _setVoterListFromDb(
        pageNoLocal,
        requireLoader,
        requireBottomLoader,
        PAGE_LIMIT,
        searchText,
      );
    }
  };
  const _onEndReached = async () => {
    await _updatePageNo(pageNo + 1, false, true);
  };
  const _onReferesh = async () => {
    setSearchText('');
    setIsFilterOn(false);
    setFilterData([]);
    await setPageNo(1);
    _setVoterListFromDb(1, true, false, PAGE_LIMIT, '').then(() => {});
  };
  const _renderPlaceHolder = () => {
    return <View style={[styleSheet.generalPlaceHolderView]} />;
  };
  const placeHolder = PlaceHolder({
    rows: 5,
    customView: _renderPlaceHolder(),
  });
  const _clearSearchText = () => {
    setSearchText('');
    _setVoterListFromDb().then(() => {});
  };
  const _navigateToVoterDetails = (item: any) => {
    const paramsObj = {voterDetails: item, refereshList: _refereshList};
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.voterDetails,
      paramsObj,
    );
  };
  const _refereshList = async () => {
    await _setVoterListFromDb(1, true, false, PAGE_LIMIT, searchText);
  };
  const _renderVoterList = ({item}: any) => {
    return (
      <VoterCard
        onPressCard={() => _navigateToVoterDetails(item)}
        data={item}
      />
    );
  };
  const _onPressAddNewVoter = () => {
    const paramsObj = {
      landedForAdd: true,
      refereshList: _refereshList,
      wantToAddVolunteer: false,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.voterDetails,
      paramsObj,
    );
  };
  const _iWillApplyFilter = async (obj: any) => {
    setLoading(true);
    const filterApiRes: any = await getFilteredVoterDetailsFromDb({data: obj});
    if (filterApiRes) {
      setIsFilterOn(true);
      setFilterData(filterApiRes?.data ?? []);
    }
    setLoading(false);
    // console.log('data--', obj);
  };

  const _onPressFilterIcon = () => {
    const paramsObj = {
      fromVoterList: true,
      onChange: _iWillApplyFilter,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.appFilterScreen,
      paramsObj,
    );
  };
  // const _onChangeAge = async (e: any) => {
  //   setSelectedAge(e);
  //   await _setVoterListFromDb(1, true, false, PAGE_LIMIT, searchText, e, 150);
  // };

  useEffect(() => {
    _setVoterListFromDb().then(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Background>
      <AppHeader
        rightIcon={FILTER_ICON}
        navigation={props?.navigation ?? null}
        title={'Voter list'}
        onRightIconPress={_onPressFilterIcon}
      />
      <View style={styleSheet.dividerViewRegular} />
      {isFilterOn && (
        <CustomText
          onPress={_onReferesh}
          style={[
            styleSheet.largeSemiBold,
            {alignSelf: 'flex-end', marginRight: wp(5), marginBottom: hp(2)},
          ]}>
          Clear Filter
        </CustomText>
      )}
      <AppSearchBar
        onPressClear={_clearSearchText}
        value={searchText}
        onChange={_onChangeSearchText}
      />
      <View style={styleSheet.dividerViewRegular} />
      <View style={[styleSheet.justifyContentView, styles.totalCountView]}>
        <CustomText style={styleSheet.regularBold}>
          {'Total: ' + totalCount}
        </CustomText>
        <CustomText style={styleSheet.regularBold}>
          {'Male: ' + maleCount}
        </CustomText>
        <CustomText style={styleSheet.regularBold}>
          {'Female: ' + femaleCount}
        </CustomText>
        <CustomText style={styleSheet.regularBold}>
          {'Other: ' + otherCount}
        </CustomText>
      </View>
      <View style={styleSheet.dividerViewRegular} />
      {/*<View style={{width: '90%', alignSelf: 'center'}}>*/}
      {/*  <CustomText style={styleSheet.regularBold}>*/}
      {/*    {'Age:' + selectedAge + ' - 150'}*/}
      {/*  </CustomText>*/}
      {/*  <Slider*/}
      {/*    style={{width: '100%', height: 40, alignSelf: 'center'}}*/}
      {/*    minimumValue={1}*/}
      {/*    maximumValue={150}*/}
      {/*    minimumTrackTintColor={color.disableButton}*/}
      {/*    maximumTrackTintColor={color.enableButton}*/}
      {/*    step={1}*/}
      {/*    onSlidingComplete={_onChangeAge}*/}
      {/*  />*/}
      {/*</View>*/}
      <View style={styleSheet.dividerViewRegular} />

      {(voterList?.length > 0 || loading) && (
        <CustomFlatList
          data={
            isFilterOn
              ? isStringNotEmpty(searchText)
                ? filterSearchData
                : filterData
              : voterList
          }
          renderItem={_renderVoterList}
          contentContainerStyle={{paddingBottom: hp(40)}}
          placeHolder={placeHolder?.calculatedPlaceHolderView ?? null}
          apiLoader={calculatedLoading}
          bottomLoader={calculatedBottomLoading}
          onReferesh={_onReferesh}
          loadMore={_onEndReached}
        />
      )}
      <FabButton onPress={_onPressAddNewVoter} />
    </Background>
  );
};
const styles = StyleSheet.create({
  totalCountView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: textColor.lightestGray,
    padding: hp(1),
    borderRadius: hp(1),
  },
});
export default VoterList;
