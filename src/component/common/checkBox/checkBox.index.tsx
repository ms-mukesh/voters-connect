import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {hp, wp} from '@/src/utils/screenRatio';
import {color, textColor} from '@/src/utils/color';
import {CustomText, SvgImage} from '@/src/component/common';
import {WHITE_TICK} from '@/src/assets/images/svgIcons/authentication/authentication.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
const CustomCheckBox = (props: any) => {
  const {
    checked = false,
    title = '',
    onChange = null,
    checkIcon = WHITE_TICK,
  } = props;
  const styleSheet = StyleSheetSelection();
  //local styles sheet
  const styles = StyleSheet.create({
    mainView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxView: {
      height: hp(3),
      width: hp(3),
      borderRadius: 5,
      borderColor: color.textDarkGray,
      borderWidth: hp(0.2),
      ...styleSheet.centerValue,
    },
    checkBoxViewEnable: {
      backgroundColor: color.enableButton,
      borderWidth: 0,
    },
    titleText: {
      marginLeft: wp(1.5),
      color: textColor.primaryGray,
    },
  });
  return (
    <Pressable onPress={onChange} style={styles.mainView}>
      {!checked ? (
        <View style={styles.checkBoxView} />
      ) : (
        <View style={[styles.checkBoxView, styles.checkBoxViewEnable]}>
          <SvgImage height={hp(2)} width={hp(2)} Source={checkIcon} />
        </View>
      )}
      <CustomText style={[styleSheet.mediumLargeRegular, styles.titleText]}>
        {title}
      </CustomText>
    </Pressable>
  );
};

export default CustomCheckBox;
