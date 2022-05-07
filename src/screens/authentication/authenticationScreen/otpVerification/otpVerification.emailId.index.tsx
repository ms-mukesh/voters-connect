import React, { useMemo, useState } from 'react';
import AppModal from '@/src/component/common/appModal/appModal.index';
import { AppButton, AppCard, CustomText } from '@/src/component/common';
import {
    DID_NOT_RECEIVE_OTP_TEXT,
    EMAIL_OTP_LENGTH,
    EMAIL_OTP_MODAL_TITLE,
    INVALID_OTP_MESSAGE,
    OTP_RESENT_TIMER,
    RESEND_OTP,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '@/src/utils/screenRatio';
import { color, textColor } from '@/src/utils/color';
import OTPInputView from '@twotalltotems/react-native-otp-input/dist';
import Timer from '@/src/component/sections/timer/timer.index';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';
import {
    generateOtpPurpose,
    verifyOtpPurpose,
} from '@/src/config/awsConfig.index';
import {
    generateOtpFromApi,
    verifyOtpFromApi,
} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';

import CustomActivityIndicator from '@/src/component/common/activityIndicator/activityIndicator.index';
interface EmailOtpVerificationType {
    showModal?: boolean;
    closeModal?: any;
    emailId?: string;
    onEmailVerified?: any;
}
const EmailOtpVerification = (props: EmailOtpVerificationType) => {
    const {
        showModal = false,
        emailId = '',
        closeModal = null,
        onEmailVerified = null,
    } = props;
    const styleSheet = StyleSheetSelection();
    //state variables
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

    //logical methods

    const _validateOTP = async (otp: string) => {
        setApiLoader(true);
        const verifyOtpRes = await verifyOtpFromApi(
            emailId,
            otp,
            verifyOtpPurpose.emailId
        );
        if (verifyOtpRes) {
            onEmailVerified !== null && onEmailVerified(true);
            closeModal !== null && closeModal();
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
        await generateOtpFromApi(emailId, generateOtpPurpose.email);
        setApiLoader(false);
        _isResend(false);
        _turnOfLoader();
    };

    return (
        <AppModal onPress={closeModal} visible={showModal}>
            <AppCard customMainView={{ width: wp(90) }}>
                <View style={styleSheet.dividerViewRegular} />
                <CustomText style={[styleSheet.largeRegular, styles.titleText]}>
                    {EMAIL_OTP_MODAL_TITLE}
                </CustomText>
                <View style={styleSheet.dividerView} />
                <CustomText
                    style={[
                        styleSheet.regular,
                        styleSheet.titleSecondaryColor,
                        styles.titleText,
                    ]}
                >
                    {emailId}
                </CustomText>
                <View style={styleSheet.dividerViewRegular} />
                <View style={styleSheet.dividerViewRegular} />
                <CustomActivityIndicator isLoading={calculatedApiLoader} />
                <View style={styles.otpMainView}>
                    <OTPInputView
                        style={styles.otpTextInput}
                        pinCount={EMAIL_OTP_LENGTH}
                        placeholderTextColor={color.black}
                        code={''}
                        onCodeChanged={(code) => {
                            setIsButtonEnable(
                                code?.length === EMAIL_OTP_LENGTH
                            );
                            setOtpCode(code);
                        }}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={
                            styles.underlineStyleHighLighted
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
                    {/*<View style={styleSheet.dividerViewRegular} />*/}
                    {calculatedIsInvalidOTP && (
                        <CustomText style={styles.invalidOtpMessageText}>
                            {INVALID_OTP_MESSAGE}
                        </CustomText>
                    )}
                    {calculatesIsResend ? (
                        <CustomText
                            onPress={_onPressResendOtp}
                            style={styles.resendText}
                        >
                            {RESEND_OTP}
                        </CustomText>
                    ) : (
                        <View style={styles.resentOtpView}>
                            <CustomText style={styles.resendTextDisable}>
                                {DID_NOT_RECEIVE_OTP_TEXT + ' Resend In '}
                            </CustomText>
                            <CustomText style={styles.resentTimeText}>
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
                <View style={styleSheet.dividerView} />
                <AppButton
                    disabled={
                        !calculatedIsButtonEnable || calculatedScreenLoader
                    }
                    inActive={!calculatedIsButtonEnable}
                    onPress={() => _validateOTP(calculatedOTPCode)}
                    containerStyle={styles.verifyButton}
                    title={'Ok'}
                />
                <View style={styleSheet.dividerViewRegular} />
            </AppCard>
        </AppModal>
    );
};
const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
    },
    otpMainView: {
        // flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpTextInput: { width: '100%', height: hp(6) },
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
    verifyButton: {
        width: wp(35),
    },
});
export default EmailOtpVerification;
