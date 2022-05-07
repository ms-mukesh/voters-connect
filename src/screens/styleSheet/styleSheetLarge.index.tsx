import { StyleSheet } from 'react-native';
import { textColor } from '@/src/utils/color';
import { normalize } from '@/src/utils/screenRatio';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';

const style = StyleSheet.create({
    regularBold: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY.GilroyBold,
        color: textColor.primaryText,
    },
    largeBold: {
        fontSize: normalize(14),
        fontFamily: FONT_FAMILY.GilroyBold,
        color: textColor.primaryText,
    },
    mediumLargeBold: {
        fontSize: normalize(16),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyBold,
    },
    xLargeBold: {
        fontSize: normalize(23),
        fontFamily: FONT_FAMILY.GilroyBold,
        color: textColor.primaryText,
    },
    xxLargeBold: {
        fontSize: normalize(28),
        fontFamily: FONT_FAMILY.GilroyBold,
        color: textColor.primaryText,
    },
    xxxLargeBold: {
        fontSize: normalize(34),
        fontFamily: FONT_FAMILY.GilroyBold,
        color: textColor.primaryText,
    },
    small: {
        fontSize: normalize(11),
        color: textColor.primaryGray,
        fontFamily: FONT_FAMILY.GilroyMedium,
    },
    regular: {
        fontSize: normalize(12),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyRegular,
    },
    largeRegular: {
        fontSize: normalize(14),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyRegular,
    },
    mediumLargeRegular: {
        fontSize: normalize(16),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyRegular,
    },
    xLargeRegular: {
        fontSize: normalize(23),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyRegular,
    },
    xxLargeRegular: {
        fontSize: normalize(28),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyRegular,
    },
    regularSemiBold: {
        fontSize: normalize(12),
        fontFamily: FONT_FAMILY.GilroySemiBold,
        color: textColor.primaryText,
    },
    largeSemiBold: {
        fontSize: normalize(14),
        fontFamily: FONT_FAMILY.GilroySemiBold,
        color: textColor.primaryText,
    },
    mediumLargeSemiBold: {
        fontSize: normalize(16),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroySemiBold,
    },
    xLargeSemiBold: {
        fontSize: normalize(23),
        fontFamily: FONT_FAMILY.GilroySemiBold,
        color: textColor.primaryText,
    },
    xxLargeSemiBold: {
        fontSize: normalize(28),
        fontFamily: FONT_FAMILY.GilroySemiBold,
        color: textColor.primaryText,
    },
    xxxLargeSemiBold: {
        fontSize: normalize(34),
        fontFamily: FONT_FAMILY.GilroySemiBold,
        color: textColor.primaryText,
    },
    xxxLargeRegular: {
        fontSize: normalize(34),
        color: textColor.primaryText,
        fontFamily: FONT_FAMILY.GilroyRegular,
    },
});
export default style;
