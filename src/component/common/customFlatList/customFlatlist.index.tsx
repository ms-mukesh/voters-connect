import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {hp} from '@/src/utils/screenRatio';
import {
  EmptyScreen,
  RefreashLoader,
  BottomLoader,
} from '@/src/component/common/';
interface FlatListType {
  data?: any[];
  renderItem?: any;
  numColumns?: number;
  horizontal?: boolean;
  loadMore?: any;
  contentContainerStyle?: any;
  apiLoader?: boolean;
  bottomLoader?: boolean;
  placeHolder?: any[];
  emptyScreenTitle?: string;
  emptyScreenCustomStyle?: null;
  customBottomLoaderStyle?: null;
  onReferesh?: any;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  isRefereshAllowed?: boolean;
  neededEmptyScreen?: boolean;
  customEmptyPlaceHolder?: any;
  onEndReachedThreshold?: number;
  columnWrapperStyle?: any;
  ItemSeparatorComponent?: any;
}

const CustomFlatList = (props: FlatListType) => {
  const {
    data = [],
    renderItem = null,
    numColumns = 1,
    horizontal = false,
    loadMore = null,
    contentContainerStyle = null,
    apiLoader = false,
    bottomLoader = false,
    placeHolder = [],
    emptyScreenTitle = 'Items not available',
    emptyScreenCustomStyle = null,
    customBottomLoaderStyle = null,
    onReferesh = null,
    showsHorizontalScrollIndicator = false,
    showsVerticalScrollIndicator = false,
    isRefereshAllowed = true,
    neededEmptyScreen = true,
    customEmptyPlaceHolder = null,
    onEndReachedThreshold = 0.5,
    columnWrapperStyle = null,
    ItemSeparatorComponent = null,
  } = props;
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [refereshing, setRefereshing] = useState(false);
  const [canShowEmptyScreen, setCanShowEmptyScreen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCanShowEmptyScreen(true);
    }, 200);
  }, []);
  const calculatedOnEndReachedCalledDuringMomentum = useMemo(() => {
    return onEndReachedCalledDuringMomentum;
  }, [onEndReachedCalledDuringMomentum]);
  const calculatedCanShowEmptyScreen = useMemo(() => {
    return canShowEmptyScreen;
  }, [canShowEmptyScreen]);
  const _onEndReached = async () => {
    loadMore !== null && loadMore();
    if (!calculatedOnEndReachedCalledDuringMomentum) {

      setOnEndReachedCalledDuringMomentum(true);
    }
  };
  const calculatedRefereshing = useMemo(() => {
    return refereshing;
  }, [refereshing]);
  const _onRefresh = () => {
    if (!isRefereshAllowed) {
      return;
    }
    setRefereshing(true);
    setTimeout(() => {
      setRefereshing(false);
    }, 200);
    onReferesh !== null && onReferesh();
  };
  return apiLoader ? (
    <SkeletonPlaceholder backgroundColor={'#efefef'}>
      <View>{placeHolder}</View>
    </SkeletonPlaceholder>
  ) : !apiLoader &&
    data.length === 0 &&
    calculatedCanShowEmptyScreen &&
    neededEmptyScreen ? (
    customEmptyPlaceHolder !== null ? (
      customEmptyPlaceHolder()
    ) : (
      <View style={styles.emptyScreenStyle}>
        <EmptyScreen
          customViewStyle={emptyScreenCustomStyle}
          title={emptyScreenTitle}
        />
      </View>
    )
  ) : (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        onEndReached={_onEndReached}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        refreshControl={
          <RefreashLoader
            refreshing={calculatedRefereshing}
            onRefresh={_onRefresh}
          />
        }
        horizontal={horizontal}
        onEndReachedThreshold={onEndReachedThreshold}
        contentContainerStyle={[styles.listContainer, contentContainerStyle]}
        numColumns={numColumns}
        data={data}
        renderItem={renderItem}
        columnWrapperStyle={columnWrapperStyle}
        ItemSeparatorComponent={ItemSeparatorComponent}
        {...props}
      />
      {bottomLoader && <BottomLoader customStyle={customBottomLoaderStyle} />}
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: hp(5),
  },
  emptyScreenStyle: {
    height: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomFlatList;
