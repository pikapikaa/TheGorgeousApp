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

const SIZE = 130;

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
      style={{flex: 1, backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
          <Text style={styles.text}>blood group: {user?.bloodGroup}</Text>
          <Text style={styles.text}>phone: {user?.phone}</Text>
          <Text style={styles.text}>email: {user?.email}</Text>
        </View>
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
    gap: 40,
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
    fontSize: 30,
    fontFamily: 'RobotoSlab-Bold',
  },
  subtitle: {fontSize: 20, color: 'black', fontFamily: 'RobotoSlab-Thin'},
  infoContainer: {gap: 5},
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'RobotoSlab-Thin',
  },
});
