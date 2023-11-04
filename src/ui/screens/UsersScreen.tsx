import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {useAppDispatch} from '../../services/hooks';
import UserItem from '../components/UserItem';
import {useNavigation} from '@react-navigation/native';
import {User} from '../../domain/User';
import {
  fetchUsers,
  selectAllUsers,
  selectError,
  selectStatus,
  setUser,
} from '../../redux/reducers/user';
import {useSelector} from 'react-redux';

const ITEM_HEIGHT = 100;

const UsersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const data = useSelector(selectAllUsers);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const onPressHandler = (item: User) => {
    navigation.navigate('UserDetail');
    dispatch(setUser(item));
  };

  let content;

  if (status === 'loading') {
    content = <ActivityIndicator />;
  } else if (status === 'succeeded') {
    content = (
      <FlatList
        data={data?.users}
        renderItem={({item}) => (
          <UserItem item={item} onPress={onPressHandler} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: (ITEM_HEIGHT + 20) * index,
          index,
        })}
      />
    );
  } else if (status === 'failed') {
    content = <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users</Text>
      {content}
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: 0,
    gap: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
