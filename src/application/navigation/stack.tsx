import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UsersScreen from '../../ui/screens/UsersScreen';
import UserDetailScreen from '../../ui/screens/UserDetailScreen';
import ProfileScreen from '../../ui/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function UsersStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerBackTitleStyle: {fontFamily: 'RobotoSlab-Medium'}}}>
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{title: '', headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Words"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export {UsersStack, ProfileStack};
