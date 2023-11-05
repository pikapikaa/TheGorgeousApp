import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../services/hooks';
import {fetchUserInfo, selectUser} from '../../redux/reducers/user';

const SIZE = 100;

const UserDetailScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchUserInfo(`/${user?.id}`));
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
        <Text style={styles.text}>blood group: {user?.bloodGroup}</Text>
        <Text style={styles.text}>phone: {user?.phone}</Text>
        <Text style={styles.text}>email: {user?.email}</Text>
      </View>
    </ScrollView>
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
