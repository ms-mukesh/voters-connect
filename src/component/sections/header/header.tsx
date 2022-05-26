import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {CustomText} from '@/src/component/common';
import {hp, wp} from '@/src/utils/screenRatio';
import {SvgImage} from '@/src/component/common/index';
import {color} from '@/src/utils/color';
import {LEFT_BACK_ARROW} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';

interface AppHeaderType {
  title?: string;
  leftIcon?: any;
  rightIcon?: any;
  onLeftIconPress?: any;
  onRightIconPress?: any;
  navigation?: any;
  backEnabled?: boolean;
  requireBackArrow?: boolean;
}
const AppHeader = (props: AppHeaderType) => {
  const styleSheet = StyleSheetSelection();
  const {
    title = '',
    leftIcon = LEFT_BACK_ARROW,
    rightIcon = null,
    onLeftIconPress = null,
    onRightIconPress = null,
    navigation = null,
    backEnabled = false,
    requireBackArrow = true,
  } = props;
  //local style sheet
  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      height: hp(8),
    },
    backArrowMainContainer: {
      flexDirection: 'row',
      height: hp(8),
      ...styleSheet.shadow,
      backgroundColor: color.white,
      borderBottomLeftRadius: hp(2),
      borderBottomRightRadius: hp(2),
    },
    backArrowView: {
      paddingLeft: wp(4),
      justifyContent: 'center',
      flex: 0.7,
    },
    iconArrowView: {
      paddingLeft: wp(4),
      justifyContent: 'center',
      flex: 1,
    },
    titleView: {
      flex: 6,
      justifyContent: 'center',
    },
    rightValueView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextWithImage: {
      marginLeft: wp(2),
    },
    profileImage: {
      height: hp(7),
      width: hp(7),
      borderRadius: hp(3.5),
      ...styleSheet.centerValue,
    },
  });

  const _executeGoBack = () => {
    navigation?.goBack();
  };
  const _renderLeftIcon = () => {
    if (leftIcon === LEFT_BACK_ARROW) {
      return <SvgImage Source={leftIcon} height={hp(5)} width={wp(5)} />;
    } else {
      return (
        <Pressable style={styles.profileImage}>
          <SvgImage
            height={hp(5)}
            width={wp(7)}
            Source={leftIcon}
            style={styles.profileImage}
          />
        </Pressable>
      );
    }
  };
  return (
    <View
      style={[
        backEnabled ? styles.backArrowMainContainer : styles.mainContainer,
      ]}>
      {requireBackArrow ? (
        <Pressable
          onPress={navigation !== null ? _executeGoBack : onLeftIconPress}
          style={
            leftIcon === LEFT_BACK_ARROW
              ? styles.backArrowView
              : styles.iconArrowView
          }>
          {_renderLeftIcon()}
        </Pressable>
      ) : (
        <View style={styleSheet.verticalDivider} />
      )}

      <View style={styles.titleView}>
        <CustomText
          numberOfLines={2}
          style={
            leftIcon === LEFT_BACK_ARROW
              ? styleSheet.xLargeBold
              : [styles.titleTextWithImage, styleSheet.xLargeBold]
          }>
          {title}
        </CustomText>
      </View>
      {rightIcon !== null && (
        <Pressable onPress={onRightIconPress} style={styles.rightValueView}>
          <SvgImage Source={rightIcon} height={hp(5)} width={wp(5)} />
        </Pressable>
      )}
    </View>
  );
};
export default AppHeader;
