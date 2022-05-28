import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {navigationRef} from './rootNavigation';
import Entrance from '@/src/screens/entrance/entrance.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import Login from '@/src/screens/authentication/authenticationScreen/login/login.index';
import Signup from '@/src/screens/authentication/authenticationScreen/signup/signup.index';
import OtpVerification from '@/src/screens/authentication/authenticationScreen/otpVerification/otpVerification.phoneNumber.index';
import ForgotPassword from '@/src/screens/authentication/authenticationScreen/forgotPassword/forgotPassword.index';
import SetPassword from '@/src/screens/authentication/authenticationScreen/setPassword/setPassword.index';
import Toast from 'react-native-toast-message';
import {MainBottomTab} from '@/src/navigation/bottomTab/mainBottomTab';
import Splashscreen from '@/src/screens/splashScreen/splashScreen/splashScreen.index';
import SetEmailAndUserName from '@/src/screens/authentication/authenticationScreen/setEmailAndUserName/setEmailAndUserName.index';
import OnBoarding from '@/src/screens/onBoarding/onBoardingScreen/onBoarding.index';
import PersonalDetails from '@/src/screens/onBoarding/onBoardingScreen/userDetailsForms/personalDetails.index';
import SkillDetails from '@/src/screens/onBoarding/onBoardingScreen/userDetailsForms/skillDetails.index';
import SearchScreen from '@/src/screens/commonScreen/searchScreen/searchScreen.index';
import VoterList from '@/src/screens/modules/voterList/voterListScreen/voterList.index';
import VoterDetails from '@/src/screens/modules/voterList/voterListScreen/voterDetails.index';
import ElectionList from '@/src/screens/modules/election/electionScreen/election.index';
import AddNewElection from '@/src/screens/modules/election/electionScreen/addNewElection.index';
import ElectionVotersTab from '@/src/screens/modules/election/electionScreen/electionVoters/electionVoters.tab.index';
import AppFilterScreen from '@/src/screens/commonScreen/filterScreen/appFilterScreen.index';
import Volunteer from '@/src/screens/modules/volunteer/volunteerScreen/volunteer.index';

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_NAME.splashScreen}>
        <Stack.Screen name={SCREEN_NAME.entrance} component={Entrance} />
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
        <Stack.Screen name={SCREEN_NAME.setPassword} component={SetPassword} />
        <Stack.Screen
          name={SCREEN_NAME.splashScreen}
          component={Splashscreen}
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
        <Stack.Screen name={SCREEN_NAME.voterList} component={VoterList} />
        <Stack.Screen
          name={SCREEN_NAME.voterDetails}
          component={VoterDetails}
        />
        <Stack.Screen
          name={SCREEN_NAME.electionList}
          component={ElectionList}
        />
        <Stack.Screen
          name={SCREEN_NAME.addNewElection}
          component={AddNewElection}
        />
        <Stack.Screen
          name={SCREEN_NAME.electionVotersTab}
          component={ElectionVotersTab}
        />
        <Stack.Screen
          name={SCREEN_NAME.appFilterScreen}
          component={AppFilterScreen}
        />
        <Stack.Screen name={SCREEN_NAME.volunteerList} component={Volunteer} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default AppNavigation;
