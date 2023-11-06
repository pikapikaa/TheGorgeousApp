import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UsersScreen from '../../ui/screens/UsersScreen';
import UserDetailScreen from '../../ui/screens/UserDetailScreen';
import ProfileScreen from '../../ui/screens/ProfileScreen';
import {selectTheme} from '../../redux/reducers/themeApp';
import {useSelector} from 'react-redux';
import {ThemeConstants} from '../../libs/constants';

const Stack = createNativeStackNavigator();

function UsersStack() {
  const theme = useSelector(selectTheme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleStyle: {fontFamily: 'RobotoSlab-Medium'},
        headerStyle: {backgroundColor: ThemeConstants[theme].backgroundColor},
        headerTintColor: ThemeConstants[theme].fontColor,
      }}>
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
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
