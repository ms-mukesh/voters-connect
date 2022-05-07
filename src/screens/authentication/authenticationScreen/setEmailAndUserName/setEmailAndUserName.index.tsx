import React, {useMemo, useState} from 'react';
import {
  AppButton,
  Background,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTextInput,
  Loader,
  ProgressBar,
} from '@/src/component/common';
import {AppHeader} from '@/src/component/sections/section.index';
import {View} from 'react-native';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import {
  CONCERN_TEXT,
  COUNTRY_CODE,
  EMAIL_ADDRESS_TEXTINPUT,
  FULL_NAME_TEXTINPUT,
  INVALID_EMAIL,
  INVALID_NAME,
  LOGIN_MOBILE_TEXTINPUT,
  NEXT_BUTTON_TEXT,
  NUMBER_VERIFICATION_MESSAGE,
  SIGNUP_TITLE,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import {
  isInValidEmailAddress,
  validateName,
} from '@/src/utils/validations/fieldValidator.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import EmailOtpVerification from '@/src/screens/authentication/authenticationScreen/otpVerification/otpVerification.emailId.index';
import {generateOtpFromApi} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import {generateOtpPurpose} from '@/src/config/awsConfig.index';
import {SvgImage} from '@/src/component/common';
import {RIGHT_TICK_V2_WHITE} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import {hp, wp} from '@/src/utils/screenRatio';

const SetEmailAndUserName = (props: any) => {
  const {} = props;
  const countryCode = props?.route?.params?.countryCode ?? COUNTRY_CODE;
  const styleSheet = StyleSheetSelection();
  //state variables
  const [fullName, setFullName] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [signupButtonLoader, setSignupButtonLoader] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const calculatedFullName = useMemo(() => {
    return fullName;
  }, [fullName]);
  const calculatedEmailAddress = useMemo(() => {
    return emailAddress;
  }, [emailAddress]);

  const calculatedSignupButtonLoader = useMemo(() => {
    return signupButtonLoader;
  }, [signupButtonLoader]);
  const calculatedIsEmailVerified = useMemo(() => {
    return isEmailVerified;
  }, [isEmailVerified]);

  const calculatedShowShowEmailVerificationModal = useMemo(() => {
    return showEmailVerificationModal;
  }, [showEmailVerificationModal]);
  const calculatedApiLoader = useMemo(() => {
    return apiLoader;
  }, [apiLoader]);

  const _onChangeFullName = (e: any) => {
    setFullName(e?.nativeEvent?.text ?? '');
  };
  const _onChangeEmailAddress = (e: any) => {
    setEmailAddress(e?.nativeEvent?.text ?? '');
  };
  const _iWillValidateInputFields = () => {
    if (!validateName(calculatedFullName)) {
      showPopupMessage({message: INVALID_NAME, type: 'error'});
      return false;
    }
    if (!isInValidEmailAddress(calculatedEmailAddress)) {
      showPopupMessage({message: INVALID_EMAIL, type: 'error'});
      return false;
    }
    return true;
  };
  const _renderValidateEmailView = () => {
    return calculatedIsEmailVerified ? (
      <View style={styles.emailVerificationView}>
        <SvgImage height={hp(2)} width={wp(3)} Source={RIGHT_TICK_V2_WHITE} />
      </View>
    ) : (
      <CustomText
        style={[
          styleSheet.underLine,
          styleSheet.titleColor,
          styles.validateEmailText,
        ]}
        onPress={_generateEmailOtp}>
        Validate
      </CustomText>
    );
  };
  const _generateEmailOtp = async () => {
    if (!isInValidEmailAddress(calculatedEmailAddress)) {
      showPopupMessage({message: INVALID_EMAIL, type: 'error'});
      return;
    }
    setApiLoader(true);
    const isOtpGenerated = await generateOtpFromApi(
      calculatedEmailAddress,
      generateOtpPurpose.email,
    );
    if (isOtpGenerated) {
      _toggleEmailVerificationModal();
    }
    setApiLoader(false);
  };
  const _executeSignupMethod = async () => {
    const isMyInputFieldsAreValid = _iWillValidateInputFields();
    if (isMyInputFieldsAreValid) {
      setSignupButtonLoader(true);
      const paramsObj = {
        fullName: calculatedFullName,
        emailAddress: calculatedEmailAddress,
        phoneNumber: props?.route?.params?.phoneNumber ?? '',
        countryCode: countryCode,
      };
      implementStackNavigation(
        props.navigation ?? null,
        SCREEN_NAME.setPassword,
        paramsObj,
      );
      // const newUserCreateRes = await signupUserFromApi(
      //     COUNTRY_CODE + props?.route?.params?.phoneNumber ?? '',
      //     calculatedFullName
      // );
      // if (newUserCreateRes) {
      //     // @ts-ignore
      //     const loginRes: LoginResType = await cognitoLogin(
      //         COUNTRY_CODE + props?.route?.params?.phoneNumber ?? ''
      //     );
      //     if (loginRes.success) {
      //         implementReplaceNavigation(
      //             props.navigation ?? null,
      //             SCREEN_NAME.indexScreen
      //         );
      //     }
      // }
      setSignupButtonLoader(false);
    }
  };

  const _toggleEmailVerificationModal = () => {
    setShowEmailVerificationModal(!calculatedShowShowEmailVerificationModal);
  };
  const _executeWhenEmailVerified = (isVerified: boolean) => {
    setIsEmailVerified(isVerified);
  };

  return (
    <Background>
      <Loader isLoading={calculatedApiLoader} />
      <AppHeader navigation={props?.navigation ?? null} />
      <ProgressBar percentage={50} total={2} completed={1} />
      <View style={styleSheet.dividerViewRegular} />
      <View style={styleSheet.dividerViewRegular} />
      <CustomKeyboardAwareScrollView
        customStyle={styles.customKeyboardAwareView}>
        <View style={styleSheet.contentMainView}>
          <CustomText
            style={[
              styleSheet.xxLargeBold,
              styles.loginTitle,
              styleSheet.titleColor,
            ]}>
            {SIGNUP_TITLE}
          </CustomText>
          <View style={styleSheet.dividerView} />
          <CustomText style={styleSheet.mediumLargeRegular}>
            {NUMBER_VERIFICATION_MESSAGE}
          </CustomText>
          <View style={styleSheet.dividerViewLarge} />
          <CustomTextInput
            value={calculatedFullName}
            onChange={_onChangeFullName}
            header={FULL_NAME_TEXTINPUT.header}
            placeholder={FULL_NAME_TEXTINPUT.placeHolder}
          />
          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            editable={!calculatedIsEmailVerified}
            value={calculatedEmailAddress}
            onChange={_onChangeEmailAddress}
            header={EMAIL_ADDRESS_TEXTINPUT.header}
            placeholder={EMAIL_ADDRESS_TEXTINPUT.placeHolder}
            rightComponent={_renderValidateEmailView}
          />
          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            value={props?.route?.params?.phoneNumber ?? ''}
            leftStaticText={countryCode}
            onChange={null}
            editable={false}
            header={LOGIN_MOBILE_TEXTINPUT.header}
            placeholder={LOGIN_MOBILE_TEXTINPUT.placeHolder}
          />
          <View style={styleSheet.dividerViewRegular} />
          <View style={styleSheet.dividerViewRegular} />
          <AppButton
            buttonLoader={calculatedSignupButtonLoader}
            onPress={_executeSignupMethod}
            title={NEXT_BUTTON_TEXT}
            inActive={
              !isInValidEmailAddress(calculatedEmailAddress) ||
              !isStringNotEmpty(calculatedFullName) ||
              !calculatedIsEmailVerified
            }
          />
          <View style={styleSheet.dividerView} />
          <CustomText style={[styleSheet.small, styles.concernText]}>
            {CONCERN_TEXT}
          </CustomText>
          {calculatedShowShowEmailVerificationModal && (
            <EmailOtpVerification
              onEmailVerified={_executeWhenEmailVerified}
              emailId={calculatedEmailAddress}
              showModal={calculatedShowShowEmailVerificationModal}
              closeModal={_toggleEmailVerificationModal}
            />
          )}
        </View>
      </CustomKeyboardAwareScrollView>
    </Background>
  );
};
export default SetEmailAndUserName;
