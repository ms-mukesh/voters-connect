import React, {useEffect, useMemo, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image, StyleSheet, View} from 'react-native';
import {hp, wp} from '@/src/utils/screenRatio';
import {color} from '@/src/utils/color';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {
  DASHBOARD_ACTIVE,
  DASHBOARD_INACTIVE,
  ELECTION_ACTIVE,
  ELECTION_INACTIVE,
  USER_ACTIVE,
  USER_INACTIVE,
  VOLUNTEER_ACTIVE,
  VOLUNTEER_INACTIVE,
  VOTER_ACTIVE,
  VOTER_INACTIVE,
} from '../../assets/images/svgIcons/bottomTab/bottomTabIcon.index';
import Dashboard from '@/src/screens/modules/dashboard/dashboardScreen/dashboard.index';
import Account from '@/src/screens/modules/account/account.index';
import VoterList from '@/src/screens/modules/voterList/voterListScreen/voterList.index';
import ElectionList from '@/src/screens/modules/election/electionScreen/election.index';
import Volunteer from '@/src/screens/modules/volunteer/volunteerScreen/volunteer.index';

const Tab = createBottomTabNavigator();
const TABS_NAME = {
  dashBoard: 'Dashboard',
  voter: 'Voters',
  election: 'Elections',
  volunteer: 'Volunteer',
  account: 'Account',
};
export const MainBottomTab = (props: any) => {
  const [initialRoute, setInitialRoute] = useState(
    props?.route?.params?.screenName ?? SCREEN_NAME.dashboard,
  );
  const calculatedInitialRoute = useMemo(() => {
    return initialRoute;
  }, [initialRoute]);
  useEffect(() => {
    setInitialRoute(props?.route?.params?.screenName ?? SCREEN_NAME.dashboard);
  }, [props?.route?.params]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {paddingBottom: hp(1), height: '8%'},
        tabBarIcon: ({focused}) => {
          let iconName;
          switch (route.name) {
            case TABS_NAME.dashBoard:
              iconName = focused ? DASHBOARD_ACTIVE : DASHBOARD_INACTIVE;
              break;
            case TABS_NAME.voter:
              iconName = focused ? VOTER_ACTIVE : VOTER_INACTIVE;
              break;
            case TABS_NAME.election:
              iconName = focused ? ELECTION_ACTIVE : ELECTION_INACTIVE;
              break;
            case TABS_NAME.volunteer:
              iconName = focused ? VOLUNTEER_ACTIVE : VOLUNTEER_INACTIVE;
              break;
            case TABS_NAME.account:
              iconName = focused ? USER_ACTIVE : USER_INACTIVE;
              break;
          }

          // You can return any component that you like here!
          return !focused ? (
            <Image
              resizeMode={'contain'}
              style={styles.bottomIcon}
              // height={hp(4)}
              source={iconName}
            />
          ) : (
            <View>
              <Image
                resizeMode={'contain'}
                style={styles.bottomIcon}
                // height={hp(3)}
                source={iconName}
              />
              <View style={styles.highLightedLine} />
            </View>
          );
        },
        tabBarActiveTintColor: color.enableButton,
        tabBarInactiveTintColor: color.disableButton,
      })}
      initialRouteName={calculatedInitialRoute}>
      <Tab.Screen name={TABS_NAME.dashBoard} component={Dashboard} {...props} />
      <Tab.Screen name={TABS_NAME.voter} component={VoterList} {...props} />
      <Tab.Screen
        name={TABS_NAME.election}
        component={ElectionList}
        {...props}
      />
      <Tab.Screen name={TABS_NAME.volunteer} component={Volunteer} {...props} />

      <Tab.Screen name={TABS_NAME.account} component={Account} {...props} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  highLightedLine: {
    backgroundColor: color.enableButton,
    position: 'absolute',
    marginTop: hp(-0.5),
    height: hp(0.3),
    width: wp(10),
    alignSelf: 'center',
  },
  bottomIcon: {
    marginTop: hp(1),
    height: hp(3),
    width: wp(10),
    // marginBottom: hp(1),
  },
});
