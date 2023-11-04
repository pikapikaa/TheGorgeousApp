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
          options={{title: 'Главная'}}
        />
        <Tab.Screen
          name="profile"
          component={ProfileStack}
          options={{title: 'Профиль'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
