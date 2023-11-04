import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {useAppSelector, useData} from '../../services/hooks';
import {selectUser} from '../../redux/reducers/user';

interface UsersScreenProps {}

const UsersScreen = (props: UsersScreenProps) => {
  const users = useData('https://dummyjson.com/users');
  return (
    <View style={styles.container}>
      <Text>UsersScreen</Text>
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {},
});
