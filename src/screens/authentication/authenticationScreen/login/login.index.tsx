import React, { useEffect, useMemo, useState } from 'react';
import {
    AppButton,
    Background,
    CustomCheckBox,
    CustomKeyboardAwareScrollView,
    CustomText,
    CustomTextInput,
} from '@/src/component/common';
import { Keyboard, Pressable, View } from 'react-native';
import {
    CONCERN_TEXT,
    COUNTRY_CODE,
    DONT_HAVE_ACCOUNT_TEXT,
    FORGOT_PWD_TEXT,
    INVALID_PASSWORD,
    INVALID_PHONE_NUMBER_MESSAGE,
    LOGIN_BUTTON_TITLE,
    LOGIN_FAILED,
    LOGIN_MOBILE_TEXTINPUT,
    LOGIN_PWD_TEXTINPUT,
    LOGIN_TITLE,
    MOBILE_MAX_LENGTH,
    REMEMBER_ME_TEXT,
    SIGNUP_TITLE,
    TEMP_COUNTRY_CODE,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import { implementStackNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import {
    isEnteredValidPhoneNumber,
    validatePhoneNumber,
} from '@/src/utils/validations/fieldValidator.index';
import { KEYBOARD_TYPE } from '@/src/constant/generalConst';
import { showPopupMessage } from '@/src/utils/localPopup';
import {
    getValueFromAsyncStorage,
    removeValueFromAsyncStore,
    setValueInAsyncStorage,
} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import { ASYNC_STORAGE_CONST } from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';
import {
    EYE_DASHED,
    EYE_OPENED,
} from '@/src/assets/images/svgIcons/authentication/authentication.index';
import { cognitoLogin } from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import { LoginResType } from '@/src/screens/authentication/authenticationUtils/authenticationTypes.index';
import { generateOtpFromApi } from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import { generateOtpPurpose } from '@/src/config/awsConfig.index';
import CountryCodeInputBox from '@/src/component/common/countryCodeInputBox/coutryCodeInputBox.index';
import { DOWN_ARROW_PRIMARY } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
const Login = (props: any) => {
    const {} = props;
    const styleSheet = StyleSheetSelection();
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [countyCode, setCountryCode] = useState(COUNTRY_CODE);
    const [isRememberSelected, setIsRememberSelected] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const [loginButtonLoader, setLoginButtonLoader] = useState(false);
    const [isStaffLogin, setIsStaffLogin] = useState(false);
    const calculatedIsPhoneNumberValid = useMemo(() => {
        return isValidPhoneNumber;
    }, [isValidPhoneNumber]);

    const calculatedIsStaffLogin = useMemo(() => {
        return isStaffLogin;
    }, [isStaffLogin]);
    const calculatedLoginButtonLoader = useMemo(() => {
        return loginButtonLoader;
    }, [loginButtonLoader]);
    const [showPassword, setShowPassword] = useState(false);
    const calculatedMobileNo = useMemo(() => {
        return mobileNo;
    }, [mobileNo]);
    const calculatedIsRememberSelected = useMemo(() => {
        return isRememberSelected;
    }, [isRememberSelected]);
    const calculatedPassword = useMemo(() => {
        return password;
    }, [password]);
    const calculatedShowPassword = useMemo(() => {
        return showPassword;
    }, [showPassword]);
    const calculatedCountryCode = useMemo(() => {
        return countyCode;
    }, [countyCode]);
    const _onChangeMobileNumber = (e: any) => {
        (calculatedMobileNo.length === 1 ||
            e?.nativeEvent?.key === 'Backspace' ||
            isEnteredValidPhoneNumber(e?.nativeEvent?.text ?? '')) &&
            setMobileNo(e?.nativeEvent?.text ?? '');
        setIsValidPhoneNumber(validatePhoneNumber(e?.nativeEvent?.text));
        validatePhoneNumber(e?.nativeEvent?.text) && Keyboard.dismiss();
    };
    const _onChangePassword = (e: any) => {
        setPassword(e?.nativeEvent?.text ?? '');
    };
    const _togglePasswordView = () => {
        setShowPassword(!calculatedShowPassword);
    };
    const _toggleIsStaffLogin = () =>
        setIsStaffLogin((previousState) => !previousState);
    const _onPressSignup = () => {
        const params = {
            mobileNumber: calculatedMobileNo,
            countryCode: calculatedCountryCode,
        };
        implementStackNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.signup,
            params
        );
    };
    const _onChangeRememberMe = () => {
        setIsRememberSelected(!calculatedIsRememberSelected);
    };
    const _onPressForgotPassword = () => {
        implementStackNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.forgotPassword
        );
    };
    const _iWillValidateInputFields = () => {
        if (!validatePhoneNumber(calculatedMobileNo)) {
            showPopupMessage({
                message: INVALID_PHONE_NUMBER_MESSAGE,
                type: 'error',
            });
            return false;
        }
        if (!calculatedIsStaffLogin && !isStringNotEmpty(calculatedPassword)) {
            showPopupMessage({ message: INVALID_PASSWORD, type: 'error' });
            return false;
        }
        return true;
    };
    const _executeStaffLogin = async () => {
        showPopupMessage({ message: 'staff login yet to be add' });
    };
    const _executeAstroLogin = async () => {
        //@ts-ignore
        const loginRes: LoginResType = await cognitoLogin(
            calculatedCountryCode + calculatedMobileNo,
            calculatedPassword
        );
        if (loginRes.success) {
            const generateOtp = await generateOtpFromApi(
                calculatedCountryCode + calculatedMobileNo,
                generateOtpPurpose.login
            );
            if (generateOtp) {
                const paramsObj = {
                    fromLogin: true,
                    mobileNumber: calculatedMobileNo,
                };
                implementStackNavigation(
                    props.navigation ?? null,
                    SCREEN_NAME.otpVerification,
                    paramsObj
                );
            }
            // implementReplaceNavigation(
            //     props.navigation ?? null,
            //     SCREEN_NAME.indexScreen
            // );
        }
    };
    const _executeLoginMethods = async () => {
        try {
            const isAllInputFieldValid = _iWillValidateInputFields();
            if (isAllInputFieldValid) {
                if (!calculatedIsRememberSelected) {
                    await setValueInAsyncStorage(
                        ASYNC_STORAGE_CONST.rememberMeValue,
                        calculatedMobileNo
                    );
                } else {
                    await removeValueFromAsyncStore(
                        ASYNC_STORAGE_CONST.rememberMeValue
                    );
                }
                setLoginButtonLoader(true);
                if (isStaffLogin) {
                    await _executeStaffLogin();
                } else {
                    await _executeAstroLogin();
                }

                // // @ts-ignore
                // const generateOtpApiRes: LoginResType =
                //     await generateOtpFromApi(COUNTRY_CODE + calculatedMobileNo);
                // if (generateOtpApiRes) {
                //     const paramsObj = {
                //         mobileNumber: calculatedMobileNo,
                //         fromLogin: true,
                //     };
                //     implementStackNavigation(
                //         props.navigation ?? null,
                //         SCREEN_NAME.otpVerification,
                //         paramsObj
                //     );
                // }
                setLoginButtonLoader(false);
            }
        } catch (ex) {
            showPopupMessage({ message: LOGIN_FAILED, type: 'error' });
        }
    };
    const _setRememberValue = async () => {
        try {
            const value = await getValueFromAsyncStorage(
                ASYNC_STORAGE_CONST.rememberMeValue
            );
            if (value) {
                setIsValidPhoneNumber(true);
                setMobileNo(value + '');
            }
        } catch (ex) {
            setMobileNo('');
        }
    };

    const _updateCountryCode = (item: any) => {
        setCountryCode(item?.value ?? '');
    };
    const _selectNewCountryCode = () => {
        const paramsObj = {
            data: TEMP_COUNTRY_CODE,
            onChange: _updateCountryCode,
        };
        implementStackNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.searchScreen,
            paramsObj
        );
    };

    //useEffects

    useEffect(() => {
        _setRememberValue().then(() => {});
    }, []);

    return (
        <Background>
            <CustomKeyboardAwareScrollView>
                <View style={styleSheet.contentMainView}>
                    <View style={styleSheet.dividerViewLarge} />
                    <CustomText
                        style={[
                            styleSheet.xxLargeBold,
                            styles.loginTitle,
                            styleSheet.titleColor,
                        ]}
                    >
                        {LOGIN_TITLE}
                    </CustomText>
                    <View style={styleSheet.dividerViewRegular} />
                    <View style={styles.mobileInputMainView}>
                        <View style={styles.countryCodeInputView}>
                            <CountryCodeInputBox
                                maxLength={MOBILE_MAX_LENGTH}
                                onChange={_onChangeMobileNumber}
                                value={calculatedCountryCode}
                                keyboardType={KEYBOARD_TYPE.numeric}
                                customTextInputMainView={{ width: '80%' }}
                                rightIcon={DOWN_ARROW_PRIMARY}
                                rightIconPress={_selectNewCountryCode}
                                editable={false}
                                onPressInputBox={_selectNewCountryCode}
                            />
                        </View>
                        <View style={styles.mobileInputView}>
                            <CustomTextInput
                                maxLength={MOBILE_MAX_LENGTH}
                                onChange={_onChangeMobileNumber}
                                placeholder={LOGIN_MOBILE_TEXTINPUT.placeHolder}
                                // header={LOGIN_MOBILE_TEXTINPUT.header}
                                value={calculatedMobileNo}
                                keyboardType={KEYBOARD_TYPE.numeric}
                                // leftStaticText={COUNTRY_CODE}
                                // requireActionButton={true}
                                // actionButtonText={'Staff'}
                                // isActionButtonChecked={calculatedIsStaffLogin}
                                actionButtonClick={_toggleIsStaffLogin}
                            />
                        </View>
                    </View>

                    {!calculatedIsStaffLogin && (
                        <View>
                            <View style={styleSheet.dividerViewRegular} />
                            <CustomTextInput
                                secureTextEntry={!calculatedShowPassword}
                                rightIcon={
                                    calculatedShowPassword
                                        ? EYE_OPENED
                                        : EYE_DASHED
                                }
                                rightIconPress={_togglePasswordView}
                                maxLength={MOBILE_MAX_LENGTH}
                                onChange={_onChangePassword}
                                placeholder={LOGIN_PWD_TEXTINPUT.placeHolder}
                                header={LOGIN_PWD_TEXTINPUT.header}
                                value={calculatedPassword}
                            />
                        </View>
                    )}
                    <View style={styleSheet.dividerViewRegular} />
                    <View style={styles.rememberMeView}>
                        <CustomCheckBox
                            checked={calculatedIsRememberSelected}
                            title={REMEMBER_ME_TEXT}
                            onChange={_onChangeRememberMe}
                        />
                        {!calculatedIsStaffLogin && (
                            <CustomText
                                onPress={_onPressForgotPassword}
                                style={[
                                    styleSheet.mediumLargeRegular,
                                    styleSheet.titleColor,
                                ]}
                            >
                                {FORGOT_PWD_TEXT}
                            </CustomText>
                        )}
                    </View>
                    <View style={styleSheet.dividerViewLarge} />
                    <View style={styles.buttonMainView}>
                        <View>
                            <AppButton
                                buttonLoader={calculatedLoginButtonLoader}
                                disabled={calculatedLoginButtonLoader}
                                inActive={
                                    isStaffLogin
                                        ? !calculatedIsPhoneNumberValid
                                        : !isStringNotEmpty(
                                              calculatedPassword
                                          ) || !calculatedIsPhoneNumberValid
                                }
                                width={'90%'}
                                title={LOGIN_BUTTON_TITLE}
                                onPress={_executeLoginMethods}
                            />
                            <View style={styleSheet.dividerView} />
                            <View style={styleSheet.dividerView} />
                            <CustomText
                                style={[styleSheet.small, styles.concernText]}
                            >
                                {CONCERN_TEXT}
                            </CustomText>
                        </View>
                        <Pressable
                            onPress={_onPressSignup}
                            style={styles.dontHaveAccountView}
                        >
                            <CustomText style={styleSheet.largeRegular}>
                                {DONT_HAVE_ACCOUNT_TEXT}
                            </CustomText>
                            <CustomText
                                style={[
                                    styleSheet.largeBold,
                                    styles.signupTitle,
                                    styleSheet.underLine,
                                ]}
                            >
                                {SIGNUP_TITLE}
                            </CustomText>
                        </Pressable>
                    </View>
                </View>
            </CustomKeyboardAwareScrollView>
        </Background>
    );
};
export default Login;
