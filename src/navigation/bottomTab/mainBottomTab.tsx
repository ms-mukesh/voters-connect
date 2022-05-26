import React, {useEffect, useMemo, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgImage} from '@/src/component/common/index';
import {StyleSheet, View} from 'react-native';
import {hp, wp} from '@/src/utils/screenRatio';
import {color} from '@/src/utils/color';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {
  ACCOUNT_ACTIVE,
  ACCOUNT_INACTIVE,
  DASHBOARD_ACTIVE,
  DASHBOARD_INACTIVE,
} from '@/src/assets/images/svgIcons/bottomTab/bottomTabIcon.index';
import Dashboard from '@/src/screens/modules/dashboard/dashboardScreen/dashboard.index';
import Account from '@/src/screens/modules/account/account.index';

const Tab = createBottomTabNavigator();
const TABS_NAME = {
  dashBoard: 'Dashboard',
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
            case TABS_NAME.account:
              iconName = focused ? ACCOUNT_ACTIVE : ACCOUNT_INACTIVE;
              break;
          }

          // You can return any component that you like here!
          return !focused ? (
            <SvgImage
              style={styles.bottomIcon}
              height={hp(4)}
              Source={iconName}
            />
          ) : (
            <View>
              <SvgImage
                style={styles.bottomIcon}
                height={hp(3)}
                Source={iconName}
              />
              <View style={styles.highLightedLine} />
            </View>
          );
        },
        tabBarActiveTintColor: '#999999',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName={calculatedInitialRoute}>
      <Tab.Screen name={TABS_NAME.dashBoard} component={Dashboard} {...props} />
      <Tab.Screen name={TABS_NAME.account} component={Account} {...props} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  highLightedLine: {
    backgroundColor: color.gray,
    position: 'absolute',
    marginTop: hp(-0.5),
    height: hp(0.3),
    width: wp(10),
    alignSelf: 'center',
  },
  bottomIcon: {
    marginTop: hp(1),
    // marginBottom: hp(1),
  },
});
