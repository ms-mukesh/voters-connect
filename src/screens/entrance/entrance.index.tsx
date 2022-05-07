import React from 'react';
import {AppButton, Background, CustomText} from '@/src/component/common';
import {Image, StyleSheet, View} from 'react-native';
import {
  APPOINTMENT_TITLE,
  BOOK_APPOINTMENT_TITLE,
} from '@/src/screens/entrance/entrance.const.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {hp, wp} from '@/src/utils/screenRatio';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {VOTER_INTRO_ICON} from '@/src/assets/images/pngIcons';
const Entrance = (props: any) => {
  const _onPressStartButton = () => {
    implementStackNavigation(props?.navigation ?? null, SCREEN_NAME.login);
  };
  const styleSheet = StyleSheetSelection();
  const styles = StyleSheet.create({
    iconView: {
      flex: 2,
      ...styleSheet.centerValue,
    },
    bottomMainView: {
      flex: 1,
      ...styleSheet.centerValue,
    },
    bookAppointmentTitle: {
      textAlign: 'center',
    },
    voterIntroIcon: {
      height: hp(50),
      width: wp(100),
    },
  });
  return (
    <Background>
      <View style={styleSheet.mainView}>
        <View style={styles.iconView}>
          <Image
            resizeMode={'contain'}
            source={VOTER_INTRO_ICON}
            style={styles.voterIntroIcon}
          />
        </View>
        <View style={styles.bottomMainView}>
          <CustomText style={[styleSheet.xxLargeBold, styleSheet.titleColor]}>
            {APPOINTMENT_TITLE}
          </CustomText>
          <View style={styleSheet.dividerView} />
          <CustomText
            style={[styleSheet.largeRegular, styles.bookAppointmentTitle]}>
            {BOOK_APPOINTMENT_TITLE}
          </CustomText>
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.dividerView} />
          <AppButton
            width={'80%'}
            onPress={_onPressStartButton}
            title={'Let’s get started'}
          />
        </View>
      </View>
    </Background>
  );
};

export default Entrance;
