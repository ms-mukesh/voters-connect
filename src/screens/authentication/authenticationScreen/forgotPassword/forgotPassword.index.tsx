import React, { useMemo, useState } from 'react';
import {
    AppButton,
    Background,
    CustomText,
    CustomTextInput,
} from '@/src/component/common';
import { AppHeader } from '@/src/component/sections/section.index';
import { StyleSheet, View } from 'react-native';
import {
    EMAILID_TEXTINPUT,
    RECOVER_PASSWORD_CONCERN_TEXT,
    RECOVER_PASSWORD_TITLE,
    SEND_RECOVERY_BUTTON_TEXT,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';
import { color } from '@/src/utils/color';
import { isInValidEmailAddress } from '@/src/utils/validations/fieldValidator.index';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
const ForgotPassword = (props: any) => {
    const {} = props;
    const styleSheet = StyleSheetSelection();
    const [emailId, setEmailId] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const calculatedEmail = useMemo(() => {
        return emailId;
    }, [emailId]);
    const calculatedIsValidEmail = useMemo(() => {
        return isValidEmail;
    }, [isValidEmail]);

    const _onChangeEmail = (e: any) => {
        setEmailId(e?.nativeEvent?.text ?? '');
        setIsValidEmail(isInValidEmailAddress(e?.nativeEvent?.text ?? ''));
    };
    return (
        <Background>
            <AppHeader navigation={props?.navigation ?? null} />
            <View style={styleSheet.dividerView} />
            <View style={styleSheet.contentMainView}>
                <CustomText
                    style={[
                        styleSheet.xxLargeBold,
                        styles.loginTitle,
                        styleSheet.titleColor,
                    ]}
                >
                    {RECOVER_PASSWORD_TITLE}
                </CustomText>
                <View style={styleSheet.dividerView} />
                <CustomText
                    style={[styleSheet.largeRegular, localStyles.concernText]}
                >
                    {RECOVER_PASSWORD_CONCERN_TEXT}
                </CustomText>
                <View style={styleSheet.dividerViewRegular} />
                <CustomTextInput
                    header={EMAILID_TEXTINPUT.header}
                    placeholder={EMAILID_TEXTINPUT.placeHolder}
                    value={calculatedEmail}
                    onChange={_onChangeEmail}
                />
                <View style={styleSheet.dividerViewLarge} />
                <AppButton
                    disabled={!calculatedIsValidEmail}
                    inActive={!calculatedIsValidEmail}
                    title={SEND_RECOVERY_BUTTON_TEXT}
                />
            </View>
        </Background>
    );
};
const localStyles = StyleSheet.create({
    headerTitle: {
        fontFamily: FONT_FAMILY.PoppinsExtraBold,
    },
    concernText: {
        color: color.textPrimaryGray,
    },
});
export default ForgotPassword;
