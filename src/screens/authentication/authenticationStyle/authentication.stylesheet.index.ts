import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';
import { color, textColor } from '@/src/utils/color';
import { hp, wp } from '@/src/utils/screenRatio';

const styles = StyleSheet.create({
    mobileInputMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countryCodeInputView: {
        flex: 1.5,
    },
    mobileInputView: {
        flex: 5,
    },
    textInputMainView: {
        flex: 1,
        justifyContent: 'center',
    },
    signupTextInputMainView: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: hp(5),
    },
    buttonMainView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    loginTitle: {
        fontFamily: FONT_FAMILY.PoppinsExtraBold,
    },
    concernText: {
        alignSelf: 'center',
        width: '85%',
        color: textColor.primaryGray,
    },
    dontHaveAccountView: {
        flexDirection: 'row',
        paddingBottom: hp(5),
        alignSelf: 'center',
        alignItems: 'center',
    },
    signupTitle: {
        color: textColor.primary,
        fontWeight: '900',
        marginLeft: wp(2),
    },
    rememberMeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInputHeader: {
        color: color.textDarkGray,
        fontFamily: FONT_FAMILY.GilroyBold,
        marginBottom: hp(1),
    },
    verifyOtpText: {
        // alignSelf: 'center',
        fontFamily: FONT_FAMILY.PoppinsBold,
    },
    signupIcon: {
        alignSelf: 'center',
    },
    lineHeight: { lineHeight: hp(3) },
    validateEmailText: { marginRight: wp(3) },
    emailVerificationView: {
        height: hp(3),
        width: hp(3),
        borderRadius: hp(1.5),
        backgroundColor: textColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customKeyboardAwareView: {
        flex: 0,
    },
});
export default styles;
