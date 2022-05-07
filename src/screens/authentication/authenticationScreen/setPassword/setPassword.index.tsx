import React, { useMemo, useState } from 'react';
import {
    AppButton,
    Background,
    CustomKeyboardAwareScrollView,
    CustomText,
    CustomTextInput,
    ProgressBar,
} from '@/src/component/common';
import { AppHeader } from '@/src/component/sections/section.index';
import { View } from 'react-native';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import {
    CONCERN_TEXT,
    CONFIRM_PASSWORD,
    CONFIRM_PWD_TEXTINPUT,
    COUNTRY_CODE,
    INVALID_PASSWORD,
    LOGIN_PWD_TEXTINPUT,
    NUMBER_VERIFICATION_MESSAGE,
    SIGN_UP_BUTTON_TITLE,
    SIGNUP_TITLE,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import {
    EYE_DASHED,
    EYE_OPENED,
} from '@/src/assets/images/svgIcons/authentication/authentication.index';
import { validatePassword } from '@/src/utils/validations/fieldValidator.index';
import { showPopupMessage } from '@/src/utils/localPopup';
import { signupUserFromApi } from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import { cognitoLogin } from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import { LoginResType } from '@/src/screens/authentication/authenticationUtils/authenticationTypes.index';
import { implementReplaceNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { SIGNUP_API_REQ_TYPE } from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.const';
import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';
const SetPassword = (props: any) => {
    const {} = props;
    const countryCode = props?.route?.params?.countryCode ?? COUNTRY_CODE;
    const styleSheet = StyleSheetSelection();
    //state variables
    // const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [signupButtonLoader, setSignupButtonLoader] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const calculatedShowPassword = useMemo(() => {
        return showPassword;
    }, [showPassword]);
    const calculatedShowConfirmPassword = useMemo(() => {
        return showConfirmPassword;
    }, [showConfirmPassword]);
    // const calculatedFullName = useMemo(() => {
    //     return fullName;
    // }, [fullName]);
    const calculatedPassword = useMemo(() => {
        return password;
    }, [password]);
    const calculatedConfirmPassword = useMemo(() => {
        return confirmPassword;
    }, [confirmPassword]);
    const calculatedSignupButtonLoader = useMemo(() => {
        return signupButtonLoader;
    }, [signupButtonLoader]);

    //methods

    // const _onChangeFullName = (e: any) => {
    //     setFullName(e?.nativeEvent?.text ?? '');
    // };
    const _onChangePassword = (e: any) => {
        setPassword(e?.nativeEvent?.text ?? '');
    };
    const _onChangeConfirmPassword = (e: any) => {
        setConfirmPassword(e?.nativeEvent?.text ?? '');
    };
    const _togglePasswordView = () => {
        setShowPassword(!calculatedShowPassword);
    };
    const _toggleConfirmPasswordView = () => {
        setShowConfirmPassword(!calculatedShowConfirmPassword);
    };
    const _iWillValidateInputFields = () => {
        // if (!validateName(calculatedFullName)) {
        //     showPopupMessage({ message: INVALID_NAME, type: 'error' });
        //     return false;
        // }
        if (!validatePassword(calculatedPassword)) {
            showPopupMessage({ message: INVALID_PASSWORD, type: 'error' });
            return false;
        }
        if (calculatedPassword !== calculatedConfirmPassword) {
            showPopupMessage({ message: CONFIRM_PASSWORD, type: 'error' });
            return false;
        }
        return true;
    };
    const _executeSignupMethod = async () => {
        const isMyInputFieldsAreValid = _iWillValidateInputFields();
        if (isMyInputFieldsAreValid) {
            setSignupButtonLoader(true);
            const createNewUserObj: SIGNUP_API_REQ_TYPE = {
                name: props?.route?.params?.fullName ?? '',
                password: calculatedPassword,
                phone_number:
                    countryCode + props?.route?.params?.phoneNumber ?? '',
                email: props?.route?.params?.emailAddress ?? '',
            };
            const newUserCreateRes = await signupUserFromApi(createNewUserObj);
            if (newUserCreateRes) {
                // @ts-ignore
                const loginRes: LoginResType = await cognitoLogin(
                    countryCode + props?.route?.params?.phoneNumber ?? '',
                    calculatedPassword
                );
                if (loginRes.success) {
                    implementReplaceNavigation(
                        props.navigation ?? null,
                        SCREEN_NAME.indexScreen
                    );
                }
            }
            setSignupButtonLoader(false);
        }
    };

    return (
        <Background>
            <AppHeader navigation={props?.navigation ?? null} />
            <ProgressBar percentage={100} total={2} completed={2} />
            <View style={styleSheet.dividerView} />
            <CustomKeyboardAwareScrollView>
                <View style={styleSheet.contentMainView}>
                    <CustomText
                        style={[
                            styleSheet.xxLargeBold,
                            styles.loginTitle,
                            styleSheet.titleColor,
                        ]}
                    >
                        {SIGNUP_TITLE}
                    </CustomText>
                    <View style={styleSheet.dividerView} />
                    <CustomText style={styleSheet.mediumLargeRegular}>
                        {NUMBER_VERIFICATION_MESSAGE}
                    </CustomText>
                    {/*<View style={styleSheet.dividerViewLarge} />*/}
                    {/*<CustomTextInput*/}
                    {/*    value={calculatedFullName}*/}
                    {/*    onChange={_onChangeFullName}*/}
                    {/*    header={FULL_NAME_TEXTINPUT.header}*/}
                    {/*    placeholder={FULL_NAME_TEXTINPUT.placeHolder}*/}
                    {/*/>*/}
                    <View style={styleSheet.dividerViewRegular} />
                    <View style={styleSheet.dividerViewRegular} />
                    <CustomTextInput
                        secureTextEntry={!calculatedShowPassword}
                        rightIconPress={_togglePasswordView}
                        rightIcon={
                            calculatedShowPassword ? EYE_OPENED : EYE_DASHED
                        }
                        value={calculatedPassword}
                        onChange={_onChangePassword}
                        header={LOGIN_PWD_TEXTINPUT.header}
                        placeholder={LOGIN_PWD_TEXTINPUT.placeHolder}
                    />
                    <View style={styleSheet.dividerViewRegular} />
                    <CustomTextInput
                        secureTextEntry={!calculatedShowConfirmPassword}
                        rightIconPress={_toggleConfirmPasswordView}
                        rightIcon={
                            calculatedShowConfirmPassword
                                ? EYE_OPENED
                                : EYE_DASHED
                        }
                        value={calculatedConfirmPassword}
                        onChange={_onChangeConfirmPassword}
                        header={CONFIRM_PWD_TEXTINPUT.header}
                        placeholder={CONFIRM_PWD_TEXTINPUT.placeHolder}
                    />
                    <View style={styleSheet.dividerViewLarge} />
                    <AppButton
                        buttonLoader={calculatedSignupButtonLoader}
                        onPress={_executeSignupMethod}
                        title={SIGN_UP_BUTTON_TITLE}
                        inActive={
                            !isStringNotEmpty(calculatedPassword) ||
                            !isStringNotEmpty(calculatedConfirmPassword)
                        }
                    />
                    <View style={styleSheet.dividerView} />
                    <CustomText style={[styleSheet.small, styles.concernText]}>
                        {CONCERN_TEXT}
                    </CustomText>
                </View>
            </CustomKeyboardAwareScrollView>
        </Background>
    );
};
export default SetPassword;
