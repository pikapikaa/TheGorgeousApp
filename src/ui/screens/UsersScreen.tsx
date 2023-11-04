import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface UsersScreenProps {}

const UsersScreen = (props: UsersScreenProps) => {
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
