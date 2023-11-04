import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface UserDetailScreenProps {}

const UserDetailScreen = (props: UserDetailScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>UserDetailScreen</Text>
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: 0,
  },
});
