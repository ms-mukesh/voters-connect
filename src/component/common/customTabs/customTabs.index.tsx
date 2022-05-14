import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {color} from '@/src/utils/color';
import {hp, wp} from '@/src/utils/screenRatio';
import {AppButton, EmptyScreen} from '@/src/component/common';
export const CustomTabs = (props: any) => {
  const {
    tabs = [],
    requireOnBottom = false,
    activeTab = 0,
    customTabStyle = null,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const calculatedActiveIndex = useMemo(() => {
    return activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(activeTab < tabs.length ? activeTab : 0);
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const _changeActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  const _renderTabsLabel = ({item, index}: any) => {
    return (
      <AppButton
        textContainerStyle={{
          color:
            index === calculatedActiveIndex
              ? color.white
              : color.disableButtonText,
        }}
        onPress={() => _changeActiveIndex(index)}
        containerStyle={[
          styles.tabButton,
          {
            marginLeft: index !== 0 ? wp(2) : 0,
            backgroundColor:
              index === calculatedActiveIndex
                ? color.enableButton
                : color.disableButton,
          },
        ]}
        title={item?.name ?? 'Tab label'}
      />
    );
  };
  return (
    <View style={styles.mainContainer}>
      {tabs?.length === 0 ? (
        <EmptyScreen title={'Please provide tab config data'} />
      ) : (
        <View style={styles.screenContainer}>
          {!requireOnBottom && (
            <View style={[styles.tabContainerView, customTabStyle]}>
              <FlatList
                contentContainerStyle={styles.tabsListMainStyle}
                horizontal={true}
                data={tabs}
                renderItem={_renderTabsLabel}
              />
            </View>
          )}
          {tabs[calculatedActiveIndex]?.screen}
          {requireOnBottom && (
            <View style={[styles.tabContainerView, customTabStyle]}>
              <FlatList
                contentContainerStyle={styles.tabsListMainStyle}
                horizontal={true}
                data={tabs}
                renderItem={_renderTabsLabel}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.red,
  },
  screenContainer: {
    flex: 1,
  },
  tabsListMainStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // marginBottom: hp(1),
  },
  tabContainerView: {
    backgroundColor: color.white,
    // ...styleSheet.shadow,
    padding: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabButton: {
    width: wp(40),
    height: hp(5.5),
    padding: 0,
  },
});
