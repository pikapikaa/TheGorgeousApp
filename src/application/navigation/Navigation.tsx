import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UsersStack, ProfileStack} from './stack';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
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
