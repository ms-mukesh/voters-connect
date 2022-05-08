import {StyleSheet, View} from 'react-native';
import React from 'react';
import {hp, normalize} from '@/src/utils/screenRatio';
import {AppButton, CustomText} from '@/src/component/common';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';

const style = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    height: hp(15),
    width: hp(15),
    resizeMode: 'contain',
  },
  mainTitle: {
    textAlign: 'center',
    marginTop: hp(1),
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(12),
  },
  subTitle: {
    textAlign: 'center',
    marginTop: hp(1),
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(10),
  },
});

const EmptyScreen = (props: any) => {
  const {
    // emptyImage = '',
    title = 'No items available',
    subtitle = '',
    requireButton = false,
    buttonText = 'Click me',
    onButtonPress = null,
    buttonCustomStyle = null,
    customViewStyle = null,
    customSubTitleStyle = null,
    customMainTitleStyle = null,
  } = props;
  const styleSheet = StyleSheetSelection();
  return (
    <View style={[style.container, {...customViewStyle}]}>
      {/*<SvgImage*/}
      {/*    height={hp(25)}*/}
      {/*    width={wp(100)}*/}
      {/*    Source={emptyImage}*/}
      {/*    style={style.image}*/}
      {/*/>*/}
      <CustomText
        style={[
          style.mainTitle,
          styleSheet.largeBold,
          {...customMainTitleStyle},
        ]}>
        {title}
      </CustomText>
      {subtitle !== '' && (
        <CustomText style={[style.subTitle, {customSubTitleStyle}]}>
          {subtitle}
        </CustomText>
      )}
      {requireButton && (
        <AppButton
          containerStyle={buttonCustomStyle}
          title={buttonText}
          onPress={onButtonPress}
        />
      )}
    </View>
  );
};

export default EmptyScreen;
