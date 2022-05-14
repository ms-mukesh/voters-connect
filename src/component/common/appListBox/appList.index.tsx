import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {CustomText} from '@/src/component/common';
import {hp} from '@/src/utils/screenRatio';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {textColor, color} from '@/src/utils/color';
interface AppListType {
  data?: any[];
  selectedIndex?: number;
  keyName?: string;
  onPress?: any;
}
const AppList = (props: AppListType) => {
  const {
    selectedIndex = 0,
    data = [],
    keyName = 'title',
    onPress = null,
  } = props;
  const stylesSheet = StyleSheetSelection();
  const styles = StyleSheet.create({
    listMainView: {
      padding: hp(2),
      ...stylesSheet.shadow,
    },
    mainView: {
      ...stylesSheet.shadow,
      width: '100%',
      alignSelf: 'center',
    },
    dividerView: {
      height: hp(0.1),
      backgroundColor: textColor.lightestGray,
    },
    activeTextColor: {
      color: color.white,
    },
  });
  const _onPressItem = (item: any, index: number) => {
    onPress !== null && onPress(item, index);
  };

  const _renderList = ({item, index}: any) => {
    return (
      <Pressable onPress={() => _onPressItem(item, index)}>
        <View
          style={[
            styles.listMainView,
            {
              backgroundColor:
                index === selectedIndex ? textColor.primary : color.white,
            },
          ]}>
          <CustomText
            style={[
              stylesSheet.largeSemiBold,
              index === selectedIndex && styles.activeTextColor,
            ]}>
            {item[keyName]}
          </CustomText>
        </View>
        {index !== data?.length - 1 && <View style={styles.dividerView} />}
      </Pressable>
    );
  };
  return (
    <View style={styles.mainView}>
      <FlatList renderItem={_renderList} data={data} />
    </View>
  );
};
export default AppList;
