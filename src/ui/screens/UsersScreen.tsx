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
  fetchExtraUsers,
  fetchUsers,
  selectAllUsers,
  selectError,
  selectLoadMore,
  selectStatus,
  selectStatusPagination,
  setUser,
} from '../../redux/reducers/user';
import {useSelector} from 'react-redux';

const ITEM_HEIGHT = 100;
const limit = 10;
const skipRange = 10;

const UsersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const data = useSelector(selectAllUsers);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const loadMore = useSelector(selectLoadMore);
  const statusPagination = useSelector(selectStatusPagination);

  useEffect(() => {
    async function loadUsers() {
      setIsFirstLoading(true);
      await dispatch(fetchUsers(`?skip=0&limit=${limit}`));
      setSkip(skipRange);
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

  const renderItem = useCallback(
    ({item}: {item: User}) => {
      return <UserItem item={item} onPress={onPressHandler} />;
    },
    [data],
  );

  const onEndReached = async () => {
    if (loadMore) {
      await dispatch(fetchExtraUsers(`?skip=${skip}&limit=${limit}`));
      setSkip(prev => prev + skipRange);
    }
  };

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator style={{marginVertical: 15}} />;
  }, [data]);

  const onPullToRefresh = () => {
    dispatch(fetchUsers(`?skip=0&limit=${limit}`));
    setSkip(skipRange);
  };

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
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: (ITEM_HEIGHT + 20) * index,
          index,
        })}
        refreshing={status === 'loading'}
        onRefresh={onPullToRefresh}
        onEndReached={onEndReached}
        ListFooterComponent={
          statusPagination === 'loading' ? listFooterComponent : null
        }
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
