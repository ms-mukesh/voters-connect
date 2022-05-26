import React from 'react';
import {StyleSheet, View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {
  AppRadioButton,
  CustomFlatList,
  CustomText,
} from '@/src/component/common';
import {textColor} from '@/src/utils/color';
import {FONT_FAMILY} from '@/src/screens/styleSheet/fontFamily.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import { wp } from "@/src/utils/screenRatio";
interface RadioButtonRowType {
  horizontal?: boolean;
  data?: any[];
  selectedIndex?: number;
  onChangeSelectedIndex?: any;
  title?: string;
  customHeaderStyle?: any;
  isMandetory?: boolean;
  headerTitleColor?: string;
  titleKey?: string;
}
const RadioButtonRow = (props: RadioButtonRowType) => {
  const {
    headerTitleColor = textColor.primaryText,
    isMandetory = true,
    customHeaderStyle = null,
    horizontal = true,
    data = [],
    selectedIndex = 0,
    onChangeSelectedIndex = null,
    title = '',
    titleKey = 'title',
  } = props;
  const styleSheet = StyleSheetSelection();
  const _onPressRadioButton = (index: number) => {
    onChangeSelectedIndex !== null && onChangeSelectedIndex(index);
  };
  const _renderRadioButtonRow = ({item, index}: any) => {
    return isStringNotEmpty(item[titleKey]) ? (
      <View key={'RadioRow' + index}>
        <AppRadioButton
          onPress={() => _onPressRadioButton(index)}
          isSelected={index === selectedIndex}
          title={item[titleKey]}
        />
      </View>
    ) : null;
  };
  const _renderListWidthSeprator = () => {
    return <View style={styles.flatListWrapper} />;
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <CustomText
          style={[
            styleSheet.regular,
            styles.headerTitle,
            {color: headerTitleColor},
            customHeaderStyle,
          ]}>
          {title}
          {isMandetory && (
            <CustomText style={[styleSheet.largeRegular, styles.mandetoryText]}>
              *
            </CustomText>
          )}
        </CustomText>
      </View>
      <View style={styleSheet.dividerViewRegular} />
      <CustomFlatList
        isRefereshAllowed={false}
        ItemSeparatorComponent={_renderListWidthSeprator}
        contentContainerStyle={styles.flatList}
        data={data}
        horizontal={horizontal}
        renderItem={_renderRadioButtonRow}
        neededEmptyScreen={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONT_FAMILY.GilroyBold,
    color: textColor.primaryText,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mandetoryText: {
    color: textColor.primary,
  },
  flatList: {
    paddingBottom: 0,
    width: wp(100),
    // paddingRight: wp(20),
  },
  flatListWrapper: {width: '2%'},
});
export default RadioButtonRow;
