import React, {useMemo, useState} from 'react';
import {
  AppButton,
  Background,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTextInput,
  Loader,
} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import {View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import {
  EMAIL_ADDRESS_TEXTINPUT,
  INVALID_EMAIL,
  INVALID_NAME,
  INVALID_PASSWORD,
  LOGIN_PWD_TEXTINPUT,
  SIGNUP_TITLE,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import {
  isInValidEmailAddress,
  validateName,
} from '@/src/utils/validations/fieldValidator.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {
  isAlpha,
  isStringNotEmpty,
} from '@/src/utils/utilityMethods/stringMethod.index';
import {
  EYE_DASHED,
  EYE_OPENED,
} from '@/src/assets/images/svgIcons/authentication/authentication.index';
import {
  loginUserApi,
  signupUserApi,
} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import {setValueInAsyncStorage} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import {ASYNC_STORAGE_CONST} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
import {implementReplaceNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
const Signup = (props: any) => {
  const styleSheet = StyleSheetSelection();
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [apiLoader, setApiLoader] = useState(false);
  const calculatedEmailAddress = useMemo(() => {
    return emailAddress;
  }, [emailAddress]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cpassword, setCPassword] = useState('');
  const [showCPassword, setShowCPassword] = useState(false);
  const calculatedPassword = useMemo(() => {
    return password;
  }, [password]);
  const calculatedShowPassword = useMemo(() => {
    return showPassword;
  }, [showPassword]);
  const calculatedCPassword = useMemo(() => {
    return cpassword;
  }, [cpassword]);
  const calculatedShowCPassword = useMemo(() => {
    return showCPassword;
  }, [showCPassword]);
  const _onChangePassword = (e: any) => {
    setPassword(e?.nativeEvent?.text ?? '');
  };
  const _onChangeCPassword = (e: any) => {
    setCPassword(e?.nativeEvent?.text ?? '');
  };
  const _onChangeEmailAddress = (e: any) => {
    setEmailAddress(e?.nativeEvent?.text ?? '');
  };
  const _togglePasswordView = () => {
    setShowPassword(!calculatedShowPassword);
  };
  const _onChangeName = (e: any) => {
    isAlpha(e?.nativeEvent?.text ?? '') && setName(e?.nativeEvent?.text ?? '');
  };
  const _toggleCPasswordView = () => {
    setShowCPassword(!calculatedShowCPassword);
  };
  const _iWillValidateInputFields = async () => {
    if (!validateName(name)) {
      showPopupMessage({message: INVALID_NAME, type: 'error'});
      return false;
    }
    if (!isInValidEmailAddress(calculatedEmailAddress)) {
      showPopupMessage({message: INVALID_EMAIL, type: 'error'});
      return false;
    }
    if (!isStringNotEmpty(calculatedPassword)) {
      showPopupMessage({message: INVALID_PASSWORD, type: 'error'});
      return false;
    }
    if (calculatedPassword?.length < 8) {
      showPopupMessage({
        message: 'Please enter minimum 8 character for password',
        type: 'error',
      });
      return false;
    }
    if (calculatedPassword !== calculatedCPassword) {
      showPopupMessage({
        message: 'Password does not match',
        type: 'error',
      });
      return false;
    }
    return true;
  };
  const _onPressConfirmSignup = async () => {
    setApiLoader(true);
    const isAllFieldValid = await _iWillValidateInputFields();
    if (isAllFieldValid) {
      const signupUserObj = {
        email: calculatedEmailAddress,
        password: calculatedPassword,
        voterName: name,
        voterType: 'volunteer',
      };

      const signupApiRes = await signupUserApi(signupUserObj);
      if (signupApiRes) {
        const loginApiRes: any = await loginUserApi(
          calculatedEmailAddress,
          calculatedPassword,
        );
        if (loginApiRes) {
          await setValueInAsyncStorage(
            ASYNC_STORAGE_CONST.accessToken,
            loginApiRes?.data?.data?.accessToken ?? '',
          );
          await setValueInAsyncStorage(
            ASYNC_STORAGE_CONST.userRole,
            loginApiRes?.data?.data?.role ?? 'normal',
          );
          implementReplaceNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.indexScreen,
          );
        }
      }
    }
    setApiLoader(false);
  };
  return (
    <Background>
      {apiLoader && <Loader isLoading={apiLoader} />}
      <AppHeader navigation={props?.navigation ?? null} />
      <CustomKeyboardAwareScrollView>
        <View style={styleSheet.contentMainView}>
          <CustomText
            style={[
              styleSheet.xxLargeBold,
              styles.loginTitle,
              styleSheet.titleColor,
            ]}>
            {SIGNUP_TITLE}
          </CustomText>
          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            onChange={_onChangeName}
            placeholder={'Enter your name'}
            header={'Name'}
            value={name}
          />
          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            value={calculatedEmailAddress}
            onChange={_onChangeEmailAddress}
            header={EMAIL_ADDRESS_TEXTINPUT.header}
            placeholder={EMAIL_ADDRESS_TEXTINPUT.placeHolder}
          />

          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            secureTextEntry={!calculatedShowPassword}
            rightIcon={calculatedShowPassword ? EYE_OPENED : EYE_DASHED}
            rightIconPress={_togglePasswordView}
            onChange={_onChangePassword}
            placeholder={LOGIN_PWD_TEXTINPUT.placeHolder}
            header={LOGIN_PWD_TEXTINPUT.header}
            value={calculatedPassword}
          />
          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            secureTextEntry={!calculatedShowCPassword}
            rightIcon={calculatedShowCPassword ? EYE_OPENED : EYE_DASHED}
            rightIconPress={_toggleCPasswordView}
            onChange={_onChangeCPassword}
            placeholder={LOGIN_PWD_TEXTINPUT.placeHolder}
            header={'Confirm Password'}
            value={calculatedCPassword}
          />
          <View style={styleSheet.dividerViewRegular} />
          <AppButton title={'Sign up'} onPress={_onPressConfirmSignup} />
        </View>
      </CustomKeyboardAwareScrollView>
    </Background>
  );
};
export default Signup;
