import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UsersScreen from '../../ui/screens/UsersScreen';
import UserDetailScreen from '../../ui/screens/UserDetailScreen';
import ProfileScreen from '../../ui/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function UsersStack() {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Words" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export {UsersStack, ProfileStack};
