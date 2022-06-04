import React from 'react';
import {hp, wp, normalize} from '@/src/utils/screenRatio';
import {Pressable, StyleSheet, View} from 'react-native';
import {CustomText, SvgImage} from '@/src/component/common';
import {color, textColor} from '@/src/utils/color';
import PlaceHolder from '@/src/component/sections/placeHolder/placeHolder.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import {FONT_FAMILY} from '@/src/screens/styleSheet/fontFamily.index';

const DashboardCard = (props: any) => {
  const {
    icon = null,
    title = '',
    subTitle = '',
    backgroundColor = color.green,
    width = '100%',
    apiLoader = false,
    onPressCard = null,
  } = props;

  const placeHolder = PlaceHolder({
    rows: 1,
    customView: <View style={[styles.placeHolderView]} />,
  });
  return (
    <Pressable onPress={onPressCard} style={{width}}>
      {apiLoader ? (
        placeHolder?.calculatedPlaceHolderView
      ) : (
        <View style={[styles.mainView, {backgroundColor}]}>
          <View style={styles.detailsView}>
            {icon !== null && (
              // <View style={styles.iconView}>
              <SvgImage Source={icon} height={hp(5)} width={wp(6)} />
              // </View>
            )}
            <CustomText style={styles.titleText}>
              {isStringNotEmpty(title) ? title : '0'}
            </CustomText>
            <CustomText style={styles.subTitleText}>{subTitle}</CustomText>
          </View>
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  mainView: {
    elevation: 5,
    shadowColor: color.shadow_color,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: hp(2),
    borderRadius: hp(1.5),
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: hp(3),
    width: '100%',
  },
  detailsView: {
    width: '95%',
    alignSelf: 'center',
  },
  iconView: {
    backgroundColor: color.white,
    padding: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
  },
  titleText: {
    fontSize: normalize(20),
    fontWeight: '700',
    marginTop: hp(0.5),
  },
  subTitleText: {
    fontSize: normalize(15),
    color: textColor.secondary,
    marginTop: hp(0.5),
    fontFamily: FONT_FAMILY.GilroyBold,
  },
  placeHolderView: {
    height: hp(19),
    backgroundColor: color.light_background,
    borderRadius: hp(1.5),
  },
});
export default DashboardCard;
