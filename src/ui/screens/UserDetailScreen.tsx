import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useAppSelector} from '../../services/hooks';
import {selectUser} from '../../redux/reducers/user';

interface UserDetailScreenProps {}

const UserDetailScreen = (props: UserDetailScreenProps) => {
  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      <Text>{user?.firstName}</Text>
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
