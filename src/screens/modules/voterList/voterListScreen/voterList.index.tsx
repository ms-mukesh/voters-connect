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
import {getVoterListFromDb} from '@/src/screens/modules/voterList/voterListNetworkCall/voterList.network';
import {
  implementStackNavigation,
  validateUpdatePageNumber,
} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import PlaceHolder from '@/src/component/sections/placeHolder/placeHolder.index';
import {hp} from '@/src/utils/screenRatio';
import VoterCard from '@/src/screens/modules/voterList/voterListCommon/voterCard.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {textColor} from '@/src/utils/color';
const VoterList = (props: any) => {
  const {} = props;
  const PAGE_LIMIT = 7;
  const [voterList, setVoterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
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
    setPageNo(1);
    await _setVoterListFromDb(
      1,
      true,
      false,
      PAGE_LIMIT,
      e?.nativeEvent?.text ?? '',
    );
  };
  const _setVoterListFromDb = async (
    pageNoLocal = calculatedPageNo,
    requireLoader = true,
    requireBottomLoader = false,
    limit = PAGE_LIMIT,
    searchKey = '',
  ) => {
    setLoading(requireLoader);
    setBottomLoading(requireBottomLoader);
    // @ts-ignore
    const voterListApiRes: any = await getVoterListFromDb(
      pageNoLocal,
      limit,
      searchKey,
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

  useEffect(() => {
    _setVoterListFromDb().then(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Background>
      <AppHeader navigation={props?.navigation ?? null} title={'Voter list'} />
      <View style={styleSheet.dividerViewRegular} />
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
      {(voterList?.length > 0 || loading) && (
        <CustomFlatList
          data={voterList}
          renderItem={_renderVoterList}
          contentContainerStyle={{paddingBottom: hp(40)}}
          placeHolder={placeHolder?.calculatedPlaceHolderView ?? null}
          apiLoader={calculatedLoading}
          bottomLoader={calculatedBottomLoading}
          onReferesh={_onReferesh}
          loadMore={_onEndReached}
        />
      )}
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
