import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UsersStack, ProfileStack} from './stack';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'users') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'profile') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="users"
          component={UsersStack}
          options={{title: 'Main'}}
        />
        <Tab.Screen
          name="profile"
          component={ProfileStack}
          options={{title: 'Profile'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
