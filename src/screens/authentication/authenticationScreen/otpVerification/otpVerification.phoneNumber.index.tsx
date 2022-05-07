import React, { useEffect, useMemo, useState } from 'react';
import {
    AppButton,
    Background,
    CustomKeyboardAwareScrollView,
    CustomText,
    Loader,
} from '@/src/component/common';
import { AppHeader } from '@/src/component/sections/section.index';
import { StyleSheet, View } from 'react-native';
import {
    COUNTRY_CODE,
    DID_NOT_RECEIVE_OTP_TEXT,
    INVALID_OTP_MESSAGE,
    OTP_LENGTH,
    OTP_RESENT_TIMER,
    OTP_SENT_TO_TEXT,
    RESEND_OTP,
    VERIFY_NUMBER_TEXT,
    VERIFY_OTP_BUTTON_TEXT,
    VERIFY_OTP_TEXT,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import { color, textColor } from '@/src/utils/color';
import OTPInputView from '@twotalltotems/react-native-otp-input/dist';
import { hp, isANDROID, wp } from '@/src/utils/screenRatio';
import Timer from '@/src/component/sections/timer/timer.index';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';
import {
    askForAutoFillOtpPermission,
    implementChangeCurrentStackNavigation,
    implementGoBack,
    implementReplaceNavigation,
} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import {
    generateOtpFromApi,
    verifyOtpFromApi,
} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { EventRegister } from 'react-native-event-listeners';
import { CUSTOM_EVENT_TYPE } from '@/src/constant/generalConst';
import {
    generateOtpPurpose,
    verifyOtpPurpose,
} from '@/src/config/awsConfig.index';
import { completeLoginFlowIndicator } from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';
import { addMaskToText } from '@/src/utils/utilityMethods/stringMethod.index';
const OtpVerification = (props: any) => {
    const {} = props;
    const countryCode = props?.route?.params?.countryCode ?? COUNTRY_CODE;
    const styleSheet = StyleSheetSelection();
    const [otpCode, setOtpCode] = useState('');
    const [isButtonEnable, setIsButtonEnable] = useState(false);
    const [screenLoader, setScreenLoader] = useState(false);
    const [isRestart, setIsRestart] = useState(false);
    const [isResend, setIsResend] = useState(false);
    const [apiLoader, setApiLoader] = useState(false);
    const calculatedApiLoader = useMemo(() => {
        return apiLoader;
    }, [apiLoader]);
    const [isInvalidOTP, setIsInvalidOTP] = useState(false);
    const calculatesIsResend = useMemo(() => {
        return isResend;
    }, [isResend]);
    const calculatesIsRestart = useMemo(() => {
        return isRestart;
    }, [isRestart]);
    const calculatedScreenLoader = useMemo(() => {
        return screenLoader;
    }, [screenLoader]);
    const calculatedIsButtonEnable = useMemo(() => {
        return isButtonEnable;
    }, [isButtonEnable]);
    const calculatedIsInvalidOTP = useMemo(() => {
        return isInvalidOTP;
    }, [isInvalidOTP]);
    const calculatedOTPCode = useMemo(() => {
        return otpCode;
    }, [otpCode]);

    //local style sheet
    const localStyle = StyleSheet.create({
        otpMainView: {
            flex: 1,
            ...styleSheet.centerValue,
        },
        resendText: {
            color: textColor.primary,
            marginTop: hp(2),
            fontFamily: FONT_FAMILY.GilroyBold,
            fontWeight: '900',
            textDecorationLine: 'underline',
        },
        resentOtpView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonView: {
            flex: 1,
            alignItems: 'center',
        },
        otpTextInput: { width: '80%', height: hp(6) },
        underlineStyleBase: {
            width: wp(12),
            height: hp(8),
            borderWidth: 1,
            fontWeight: '700',
            color: color.textDarkGray,
            borderRadius: hp(2),
        },
        underlineStyleHighLighted: {
            color: color.black,
            borderColor: color.black,
        },
        resendTextDisable: {
            color: textColor.primaryText,
            marginTop: hp(2),
        },
        resentTimeText: {
            color: color.black,
            marginTop: hp(2),
        },
        invalidOtpMessageText: {
            textAlign: 'center',
            color: color.red,
        },
    });
    const _validateOTP = async (otp: string) => {
        setApiLoader(true);
        const verifyOtpRes = await verifyOtpFromApi(
            countryCode + props?.route?.params?.mobileNumber ?? '',
            otp,
            verifyOtpPurpose.phoneNumber
        );
        if (verifyOtpRes) {
            if (props?.route?.params?.fromLogin) {
                await completeLoginFlowIndicator();
                implementReplaceNavigation(
                    props.navigation ?? null,
                    SCREEN_NAME.indexScreen
                );
            } else {
                const paramsObj = {
                    phoneNumber: props?.route?.params?.mobileNumber ?? '',
                    countryCode: countryCode,
                };

                implementChangeCurrentStackNavigation(
                    props?.navigation ?? null,
                    SCREEN_NAME.setEmailAndUserName,
                    paramsObj
                );
            }
        } else {
            setIsInvalidOTP(true);
        }
        setApiLoader(false);
    };
    const _restartTimer = (value: any) => {
        setIsRestart(value);
        setIsResend(value);
    };
    const _isResend = (value: any) => {
        setIsResend(value);
    };
    const _turnOfLoader = () => {
        setScreenLoader(false);
    };
    const _onPressResendOtp = async () => {
        setApiLoader(true);
        await generateOtpFromApi(
            countryCode + props?.route?.params?.mobileNumber ?? '',
            generateOtpPurpose.resend
        );
        setApiLoader(false);
        _isResend(false);
        _turnOfLoader();
    };
    const _autoFillOtp = (message: any) => {
        if (message === null) {
            return;
        }
        let tempMessage = message?.otpMessage ?? '';
        tempMessage = tempMessage.substring(
            tempMessage.indexOf('(') + 1,
            tempMessage.indexOf(')')
        );
        if (
            tempMessage.length === OTP_LENGTH &&
            tempMessage.indexOf('(') < 0 &&
            tempMessage.indexOf(')') < 0 &&
            !isNaN(tempMessage)
        ) {
            setOtpCode(tempMessage);
            _validateOTP(tempMessage).then(() => {});
        }
    };
    useEffect(() => {
        if (isANDROID) {
            askForAutoFillOtpPermission();
        }
        EventRegister.addEventListener(
            CUSTOM_EVENT_TYPE.otpAutoFillCustomEvent,
            (data) => {
                _autoFillOtp(data);
            }
        );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isANDROID) {
            askForAutoFillOtpPermission();
        }
        EventRegister.addEventListener(
            CUSTOM_EVENT_TYPE.otpAutoFillCustomEvent,
            (data) => {
                _autoFillOtp(data);
            }
        );
        return () => {
            EventRegister.removeEventListener(
                CUSTOM_EVENT_TYPE.otpAutoFillCustomEvent
            );
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Background>
            <Loader isLoading={calculatedApiLoader} />
            <AppHeader navigation={props?.navigation ?? null} />
            <CustomKeyboardAwareScrollView>
                <View style={styleSheet.contentMainView}>
                    <View style={styleSheet.dividerView} />
                    <View style={styleSheet.dividerView} />
                    <CustomText
                        style={[
                            styleSheet.xxLargeBold,
                            styles.loginTitle,
                            styleSheet.titleColor,
                        ]}
                    >
                        {props?.route?.params?.fromLogin
                            ? VERIFY_NUMBER_TEXT
                            : VERIFY_OTP_TEXT}
                    </CustomText>
                    <View style={styleSheet.dividerView} />
                    <CustomText
                        style={[
                            styleSheet.mediumLargeRegular,
                            styles.lineHeight,
                        ]}
                    >
                        {OTP_SENT_TO_TEXT}
                    </CustomText>
                    <CustomText
                        style={[
                            styleSheet.mediumLargeSemiBold,
                            styles.lineHeight,
                            styleSheet.titleColor,
                        ]}
                    >
                        {countryCode +
                            ' ' +
                            addMaskToText(
                                props?.route?.params?.mobileNumber ?? ''
                            ) +
                            '  '}
                        <CustomText
                            onPress={() =>
                                implementGoBack(props?.navigation ?? null)
                            }
                            style={[
                                styleSheet.mediumLargeSemiBold,
                                styles.lineHeight,
                                styleSheet.titleColor,
                                styleSheet.underLine,
                            ]}
                        >
                            Change
                        </CustomText>
                    </CustomText>
                    <View style={localStyle.otpMainView}>
                        <OTPInputView
                            style={localStyle.otpTextInput}
                            pinCount={OTP_LENGTH}
                            placeholderTextColor={color.black}
                            code={calculatedOTPCode}
                            onCodeChanged={(code) => {
                                setIsButtonEnable(code?.length === OTP_LENGTH);
                                setOtpCode(code);
                            }}
                            autoFocusOnLoad
                            codeInputFieldStyle={localStyle.underlineStyleBase}
                            codeInputHighlightStyle={
                                localStyle.underlineStyleHighLighted
                            }
                            onCodeFilled={(code) => {
                                setOtpCode(code);
                                _validateOTP(code);
                                console.log(
                                    `Code is ${code}, you are good to go!`,
                                    calculatedOTPCode
                                );
                            }}
                        />
                        <View style={styleSheet.dividerViewRegular} />
                        {calculatedIsInvalidOTP && (
                            <CustomText
                                style={localStyle.invalidOtpMessageText}
                            >
                                {INVALID_OTP_MESSAGE}
                            </CustomText>
                        )}
                        {calculatesIsResend ? (
                            <CustomText
                                onPress={_onPressResendOtp}
                                style={localStyle.resendText}
                            >
                                {RESEND_OTP}
                            </CustomText>
                        ) : (
                            <View style={localStyle.resentOtpView}>
                                <CustomText
                                    style={localStyle.resendTextDisable}
                                >
                                    {DID_NOT_RECEIVE_OTP_TEXT + ' Resend In '}
                                </CustomText>
                                <CustomText style={localStyle.resentTimeText}>
                                    <Timer
                                        maxTime={OTP_RESENT_TIMER}
                                        _restartTimer={_restartTimer}
                                        _isResend={_isResend}
                                        restartTimer={calculatesIsRestart}
                                    />
                                </CustomText>
                            </View>
                        )}
                    </View>
                    <View style={localStyle.buttonView}>
                        <AppButton
                            disabled={
                                !calculatedIsButtonEnable ||
                                calculatedScreenLoader
                            }
                            inActive={!calculatedIsButtonEnable}
                            title={VERIFY_OTP_BUTTON_TEXT}
                            onPress={() => _validateOTP(calculatedOTPCode)}
                            buttonLoader={calculatedScreenLoader}
                        />
                    </View>
                </View>
            </CustomKeyboardAwareScrollView>
        </Background>
    );
};
export default OtpVerification;
