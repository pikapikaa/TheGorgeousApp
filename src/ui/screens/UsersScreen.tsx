import React, {useCallback, useEffect, useState} from 'react';
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
  const [isFirstLoading, setIsFirstLoading] = useState(false);

  const data = useSelector(selectAllUsers);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    async function loadUsers() {
      setIsFirstLoading(true);
      await dispatch(fetchUsers(`?skip=0&limit=7`));
      setIsFirstLoading(false);
    }
    if (status === 'idle') {
      loadUsers();
    }
  }, [status, dispatch]);

  const onPressHandler = (item: User) => {
    navigation.navigate('UserDetail');
    dispatch(setUser(item));
  };

  const renderItem = useCallback(({item}: {item: User}) => {
    return <UserItem item={item} onPress={onPressHandler} />;
  }, []);

  let content;
  if (isFirstLoading) {
    content = (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  } else if (status === 'failed') {
    content = (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  } else {
    content = (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: (ITEM_HEIGHT + 20) * index,
          index,
        })}
        refreshing={status === 'loading'}
        onRefresh={() => dispatch(fetchUsers(`?skip=0&limit=7`))}
      />
    );
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
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
