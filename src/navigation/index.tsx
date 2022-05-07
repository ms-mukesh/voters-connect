import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { navigationRef } from './rootNavigation';
import Entrance from '@/src/screens/entrance/entrance.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import Login from '@/src/screens/authentication/authenticationScreen/login/login.index';
import Signup from '@/src/screens/authentication/authenticationScreen/signup/signup.index';
import OtpVerification from '@/src/screens/authentication/authenticationScreen/otpVerification/otpVerification.phoneNumber.index';
import ForgotPassword from '@/src/screens/authentication/authenticationScreen/forgotPassword/forgotPassword.index';
import SetPassword from '@/src/screens/authentication/authenticationScreen/setPassword/setPassword.index';
import Toast from 'react-native-toast-message';
import { MainBottomTab } from '@/src/navigation/bottomTab/mainBottomTab';
import Splashscreen from '@/src/screens/splashScreen/splashScreen/splashScreen.index';
import VoiceRecorder from '@/src/screens/commonScreen/recorder/voiceRecorder.index';
import SetEmailAndUserName from '@/src/screens/authentication/authenticationScreen/setEmailAndUserName/setEmailAndUserName.index';
import OnBoarding from '@/src/screens/onBoarding/onBoardingScreen/onBoarding.index';
import PersonalDetails from '@/src/screens/onBoarding/onBoardingScreen/userDetailsForms/personalDetails.index';
import SkillDetails from '@/src/screens/onBoarding/onBoardingScreen/userDetailsForms/skillDetails.index';
import SearchScreen from '@/src/screens/commonScreen/searchScreen/searchScreen.index';

const AppNavigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={SCREEN_NAME.splashScreen}
            >
                <Stack.Screen
                    name={SCREEN_NAME.entrance}
                    component={Entrance}
                />
                <Stack.Screen name={SCREEN_NAME.login} component={Login} />
                <Stack.Screen name={SCREEN_NAME.signup} component={Signup} />
                <Stack.Screen
                    name={SCREEN_NAME.indexScreen}
                    component={MainBottomTab}
                />

                <Stack.Screen
                    name={SCREEN_NAME.otpVerification}
                    component={OtpVerification}
                />
                <Stack.Screen
                    name={SCREEN_NAME.forgotPassword}
                    component={ForgotPassword}
                />
                <Stack.Screen
                    name={SCREEN_NAME.setPassword}
                    component={SetPassword}
                />
                <Stack.Screen
                    name={SCREEN_NAME.splashScreen}
                    component={Splashscreen}
                />
                <Stack.Screen
                    name={SCREEN_NAME.voiceRecorder}
                    component={VoiceRecorder}
                />
                <Stack.Screen
                    name={SCREEN_NAME.setEmailAndUserName}
                    component={SetEmailAndUserName}
                />
                <Stack.Screen
                    name={SCREEN_NAME.onBoardingIndex}
                    component={OnBoarding}
                />
                <Stack.Screen
                    name={SCREEN_NAME.personalDetails}
                    component={PersonalDetails}
                />
                <Stack.Screen
                    name={SCREEN_NAME.skillDetails}
                    component={SkillDetails}
                />
                <Stack.Screen
                    name={SCREEN_NAME.searchScreen}
                    component={SearchScreen}
                />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default AppNavigation;
