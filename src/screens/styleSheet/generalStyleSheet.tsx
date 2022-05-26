import {StyleSheet} from 'react-native';
import {color, textColor} from '@/src/utils/color';
import {hp, wp} from '@/src/utils/screenRatio';

const style = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: color.shadow_color,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  removeShadow: {
    elevation: 0,
    shadowColor: color.transparent,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  dividerView: {
    height: hp(1),
  },
  dividerViewRegular: {
    height: hp(3),
  },
  dividerViewLarge: {
    height: hp(10),
  },
  mainView: {
    flex: 1,
  },
  centerValue: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentMainView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  secondaryTextColor: {
    color: color.textDarkGray,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  primaryColor: {
    color: textColor.primaryText,
  },
  titleColor: {
    color: textColor.primary,
  },
  titleSecondaryColor: {
    color: textColor.secondary,
  },
  skyBlueBackground: {
    backgroundColor: color.skyBlue,
  },
  primaryBackground: {
    backgroundColor: color.primaryText,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  detailsView: {
    flex: 8,
  },
  bottomActionView: {
    flex: 1.5,
  },
  actionButton: {
    height: hp(7),
    width: hp(7),
    borderRadius: hp(3.5),
    backgroundColor: color.gray,
  },
  microPhoneView: {
    height: hp(15),
    width: wp(25),
    borderRadius: hp(5),
  },
  descriptionBox: {
    borderWidth: hp(0.2),
    borderColor: color.inputBoxBorderPrimary,
    height: hp(15),
    padding: hp(1),
  },
  generalPlaceHolderView: {
    backgroundColor: color.gray,
    height: hp(15),
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    borderRadius: hp(1),
  },
  justifyContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: wp(4),
  },
});
export default style;
