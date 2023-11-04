import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useAppSelector} from '../../services/hooks';
import {selectUser} from '../../redux/reducers/user';

const SIZE = 100;

interface UserDetailScreenProps {}

const UserDetailScreen = (props: UserDetailScreenProps) => {
  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image source={{uri: user?.image}} style={styles.image} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.subtitle}>{user?.university}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.text}>age: {user?.age}</Text>
        <Text style={styles.text}>gender: {user?.gender}</Text>
        <Text style={styles.text}>bloodGroup: {user?.bloodGroup}</Text>
        <Text style={styles.text}>phone: {user?.phone}</Text>
        <Text style={styles.text}>email: {user?.email}</Text>
      </View>
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
    gap: 20,
  },
  center: {
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {fontSize: 14, color: 'grey'},
  infoContainer: {gap: 5},
  text: {
    color: '#5A5754',
    fontSize: 18,
  },
});
