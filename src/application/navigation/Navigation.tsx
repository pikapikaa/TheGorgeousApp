import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UsersStack, ProfileStack} from './stack';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/reducers/themeApp';
import {ThemeConstants} from '../../libs/constants';

const Tab = createBottomTabNavigator();

function Navigation() {
  const theme = useSelector(selectTheme);
  console.log(theme);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: ThemeConstants[theme].backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={ThemeConstants[theme].backgroundColor}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: 'RobotoSlab-Medium',
              color: ThemeConstants[theme].fontColor,
            },
            tabBarIcon: ({focused, size}) => {
              let iconName;
              if (route.name === 'users') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'profile') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return (
                <Icon
                  name={iconName}
                  size={size}
                  color={ThemeConstants[theme].fontColor}
                />
              );
            },
            tabBarStyle: {
              backgroundColor: ThemeConstants[theme].backgroundColorTab,
              borderTopWidth: Platform.OS === 'android' ? 0 : 0.2,
            },
            tabBarHideOnKeyboard: true,
          })}>
          <Tab.Screen
            name="users"
            component={UsersStack}
            options={{title: 'Main'}}
          />
          <Tab.Screen
            name="profile"
            component={ProfileStack}
            options={{title: 'Settings'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default Navigation;
