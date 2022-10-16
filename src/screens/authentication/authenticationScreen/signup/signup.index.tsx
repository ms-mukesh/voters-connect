import React, {useEffect, useMemo, useState} from 'react';
import {
  AppButton,
  Background,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTextInput,
  SvgImage,
} from '@/src/component/common';
import {Keyboard, Pressable, View} from 'react-native';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';

import {
  ALREADY_HAVE_ACCOUNT,
  ALREADY_HAVE_ACCOUNT_LOGIN,
  COUNTRY_CODE,
  INVALID_PHONE_NUMBER_MESSAGE,
  MOBILE_MAX_LENGTH,
  OTP_BUTTON_TITLE,
  OTP_SENT_MESSAGE,
  SIGNUP_MOBILE_TEXTINPUT,
  SIGNUP_TITLE,
  TEMP_COUNTRY_CODE,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {
  isEnteredValidPhoneNumber,
  validatePhoneNumber,
} from '@/src/utils/validations/fieldValidator.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {generateOtpFromApi} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import {KEYBOARD_TYPE} from '@/src/constant/generalConst';
import {USER_CYCLE} from '@/src/assets/images/svgIcons/authentication/authentication.index';
import {hp, wp} from '@/src/utils/screenRatio';
import {textColor} from '@/src/utils/color';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {generateOtpPurpose} from '@/src/config/awsConfig.index';
import CountryCodeInputBox from '@/src/component/common/countryCodeInputBox/coutryCodeInputBox.index';
import {DOWN_ARROW_PRIMARY} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
const Signup = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const [mobileNo, setMobileNo] = useState(
    props?.route?.params?.mobileNumber ?? '',
  );
  const [countyCode, setCountryCode] = useState(
    props?.route?.params?.countryCode ?? COUNTRY_CODE,
  );
  const calculatedCountryCode = useMemo(() => {
    return countyCode;
  }, [countyCode]);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [generateOtpLoader, setGenerateOtpLoader] = useState(false);

  const calculatedMobileNo = useMemo(() => {
    return mobileNo;
  }, [mobileNo]);
  const calculatedGenerateOtpLoader = useMemo(() => {
    return generateOtpLoader;
  }, [generateOtpLoader]);
  const calculatedIsPhoneNumberValid = useMemo(() => {
    return isValidPhoneNumber;
  }, [isValidPhoneNumber]);
  const _onChangeMobileNumber = (e: any) => {
    (calculatedMobileNo.length === 1 ||
      e?.nativeEvent?.key === 'Backspace' ||
      isEnteredValidPhoneNumber(e?.nativeEvent?.text ?? '')) &&
      setMobileNo(e?.nativeEvent?.text ?? '');
    setIsValidPhoneNumber(validatePhoneNumber(e?.nativeEvent?.text));
    validatePhoneNumber(e?.nativeEvent?.text) && Keyboard.dismiss();
  };
  const _onPressLogin = () => {
    implementStackNavigation(props?.navigation ?? null, SCREEN_NAME.login);
  };
  const _generateOtpPress = async () => {
    try {
      if (validatePhoneNumber(calculatedMobileNo)) {
        setGenerateOtpLoader(true);
        const generateOtpRes = await generateOtpFromApi(
          calculatedCountryCode + calculatedMobileNo,
          generateOtpPurpose.signup,
        );

        setGenerateOtpLoader(false);
        if (generateOtpRes) {
          const paramObj = {
            mobileNumber: calculatedMobileNo,
            fromLogin: false,
            countryCode: calculatedCountryCode,
          };
          implementStackNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.otpVerification,
            paramObj,
          );
        }
      } else {
        showPopupMessage({
          message: INVALID_PHONE_NUMBER_MESSAGE,
          type: 'error',
        });
      }
    } catch (ex) {
      showPopupMessage({});
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
      paramsObj,
    );
  };

  useEffect(() => {
    setIsValidPhoneNumber(validatePhoneNumber(calculatedMobileNo));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Background>
      <CustomKeyboardAwareScrollView>
        <View style={styleSheet.contentMainView}>
          <View style={[styles.signupTextInputMainView]}>
            <View>
              <View style={styleSheet.dividerViewLarge} />
              <CustomText
                style={[
                  styleSheet.xxLargeBold,
                  styles.loginTitle,
                  styleSheet.titleColor,
                ]}>
                {SIGNUP_TITLE}
              </CustomText>
              <View style={styleSheet.dividerView} />
              <View style={styleSheet.dividerView} />
              <CustomText style={styleSheet.mediumLargeRegular}>
                {OTP_SENT_MESSAGE}
              </CustomText>
            </View>
            <View style={styles.mobileInputMainView}>
              <View style={styles.countryCodeInputView}>
                <CountryCodeInputBox
                  maxLength={MOBILE_MAX_LENGTH}
                  onChange={_onChangeMobileNumber}
                  value={calculatedCountryCode}
                  keyboardType={KEYBOARD_TYPE.numeric}
                  customTextInputMainView={{width: '80%'}}
                  rightIcon={DOWN_ARROW_PRIMARY}
                  rightIconPress={_selectNewCountryCode}
                  editable={false}
                  onPressInputBox={_selectNewCountryCode}
                />
              </View>
              <View style={styles.mobileInputView}>
                <CustomTextInput
                  headerTitleColor={textColor.primary}
                  // customHeaderStyle={[
                  //     styleSheet.xLargeRegular,
                  //     styles.textInputHeader,
                  //     styleSheet.titleColor,
                  // ]}
                  // header={SIGNUP_MOBILE_TEXTINPUT.header}
                  placeholder={SIGNUP_MOBILE_TEXTINPUT.placeHolder}
                  maxLength={10}
                  value={calculatedMobileNo}
                  onChange={_onChangeMobileNumber}
                  keyboardType={KEYBOARD_TYPE.numeric}
                  // leftStaticText={COUNTRY_CODE}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonMainView}>
            <SvgImage
              style={styles.signupIcon}
              width={wp(30)}
              height={hp(15)}
              Source={USER_CYCLE}
            />
            <AppButton
              buttonLoader={calculatedGenerateOtpLoader}
              onPress={_generateOtpPress}
              disabled={calculatedGenerateOtpLoader}
              inActive={!calculatedIsPhoneNumberValid}
              width={'100%'}
              title={OTP_BUTTON_TITLE}
            />
            <Pressable
              onPress={_onPressLogin}
              style={styles.dontHaveAccountView}>
              <CustomText style={styleSheet.largeRegular}>
                {ALREADY_HAVE_ACCOUNT}
              </CustomText>
              <CustomText
                style={[
                  styleSheet.largeBold,
                  styles.signupTitle,
                  styleSheet.underLine,
                ]}>
                {ALREADY_HAVE_ACCOUNT_LOGIN}
              </CustomText>
            </Pressable>
          </View>
        </View>
      </CustomKeyboardAwareScrollView>
    </Background>
  );
};
export default Signup;
