import React, {useEffect, useMemo, useState} from 'react';
import {
  AppButton,
  Background,
  CustomCheckBox,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTextInput,
} from '@/src/component/common';
import {Pressable, View} from 'react-native';
import {
  CONCERN_TEXT,
  DONT_HAVE_ACCOUNT_TEXT,
  EMAIL_ADDRESS_TEXTINPUT,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LOGIN_BUTTON_TITLE,
  LOGIN_FAILED,
  LOGIN_PWD_TEXTINPUT,
  LOGIN_TITLE,
  REMEMBER_ME_TEXT,
  SIGNUP_TITLE,
} from '@/src/screens/authentication/authenticationUtils/authentication.const.index';
import styles from '@/src/screens/authentication/authenticationStyle/authentication.stylesheet.index';
import {isInValidEmailAddress} from '@/src/utils/validations/fieldValidator.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {
  getValueFromAsyncStorage,
  removeValueFromAsyncStore,
  setValueInAsyncStorage,
} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import {ASYNC_STORAGE_CONST} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import {
  EYE_DASHED,
  EYE_OPENED,
} from '@/src/assets/images/svgIcons/authentication/authentication.index';
import {loginUserApi} from '@/src/screens/authentication/authenticationNetworkCall/authentication.network.index';
import {
  implementReplaceNavigation,
  implementStackNavigation,
} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
const Login = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const [emailAddress, setEmailAddress] = useState('');
  const calculatedEmailAddress = useMemo(() => {
    return emailAddress;
  }, [emailAddress]);
  const [password, setPassword] = useState('');
  const [isRememberSelected, setIsRememberSelected] = useState(false);
  const [loginButtonLoader, setLoginButtonLoader] = useState(false);

  const calculatedLoginButtonLoader = useMemo(() => {
    return loginButtonLoader;
  }, [loginButtonLoader]);
  const [showPassword, setShowPassword] = useState(false);

  const calculatedIsRememberSelected = useMemo(() => {
    return isRememberSelected;
  }, [isRememberSelected]);
  const calculatedPassword = useMemo(() => {
    return password;
  }, [password]);
  const calculatedShowPassword = useMemo(() => {
    return showPassword;
  }, [showPassword]);
  const _onChangePassword = (e: any) => {
    setPassword(e?.nativeEvent?.text ?? '');
  };
  const _onChangeEmailAddress = (e: any) => {
    setEmailAddress(e?.nativeEvent?.text ?? '');
  };
  const _togglePasswordView = () => {
    setShowPassword(!calculatedShowPassword);
  };
  const _onChangeRememberMe = () => {
    setIsRememberSelected(!calculatedIsRememberSelected);
  };
  const _iWillValidateInputFields = () => {
    if (!isInValidEmailAddress(calculatedEmailAddress)) {
      showPopupMessage({message: INVALID_EMAIL, type: 'error'});
      return false;
    }
    if (!isStringNotEmpty(calculatedPassword)) {
      showPopupMessage({message: INVALID_PASSWORD, type: 'error'});
      return false;
    }
    return true;
  };
  const _executeLoginMethods = async () => {
    try {
      const isAllInputFieldValid = _iWillValidateInputFields();
      if (isAllInputFieldValid) {
        if (!calculatedIsRememberSelected) {
          await setValueInAsyncStorage(
            ASYNC_STORAGE_CONST.rememberMeValue,
            calculatedEmailAddress,
          );
        } else {
          await removeValueFromAsyncStore(ASYNC_STORAGE_CONST.rememberMeValue);
        }
        setLoginButtonLoader(true);
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
        setLoginButtonLoader(false);
      }
    } catch (ex) {
      showPopupMessage({message: LOGIN_FAILED, type: 'error'});
    }
  };
  const _setRememberValue = async () => {
    try {
      const value = await getValueFromAsyncStorage(
        ASYNC_STORAGE_CONST.rememberMeValue,
      );
      if (value) {
        setEmailAddress(value + '');
      }
    } catch (ex) {
      setEmailAddress('');
    }
  };
  const _onPressSignup = () => {
    implementStackNavigation(props?.navigation ?? null, SCREEN_NAME.signup);
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
            ]}>
            {LOGIN_TITLE}
          </CustomText>
          <View style={styleSheet.dividerViewRegular} />
          <CustomTextInput
            value={calculatedEmailAddress}
            onChange={_onChangeEmailAddress}
            header={EMAIL_ADDRESS_TEXTINPUT.header}
            placeholder={EMAIL_ADDRESS_TEXTINPUT.placeHolder}
          />

          <View>
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
          </View>
          <View style={styleSheet.dividerViewRegular} />
          <View style={styles.rememberMeView}>
            <CustomCheckBox
              checked={calculatedIsRememberSelected}
              title={REMEMBER_ME_TEXT}
              onChange={_onChangeRememberMe}
            />
            {/*{!calculatedIsStaffLogin && (*/}
            {/*  <CustomText*/}
            {/*    onPress={_onPressForgotPassword}*/}
            {/*    style={[styleSheet.mediumLargeRegular, styleSheet.titleColor]}>*/}
            {/*    {FORGOT_PWD_TEXT}*/}
            {/*  </CustomText>*/}
            {/*)}*/}
          </View>
          <View style={styleSheet.dividerViewLarge} />
          <View style={styles.buttonMainView}>
            <View>
              <AppButton
                buttonLoader={calculatedLoginButtonLoader}
                disabled={calculatedLoginButtonLoader}
                width={'90%'}
                title={LOGIN_BUTTON_TITLE}
                onPress={_executeLoginMethods}
              />
              <View style={styleSheet.dividerView} />
              <View style={styleSheet.dividerView} />
              <CustomText style={[styleSheet.small, styles.concernText]}>
                {CONCERN_TEXT}
              </CustomText>
            </View>
            <Pressable
              onPress={_onPressSignup}
              style={styles.dontHaveAccountView}>
              <CustomText style={styleSheet.largeRegular}>
                {DONT_HAVE_ACCOUNT_TEXT}
              </CustomText>
              <CustomText
                style={[
                  styleSheet.largeBold,
                  styles.signupTitle,
                  styleSheet.underLine,
                ]}>
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
