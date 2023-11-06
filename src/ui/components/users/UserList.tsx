import React, {useCallback, useMemo, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

import {useAppDispatch} from '../../../services/hooks';
import UserCard from '../../components/users/UserCard';
import {useNavigation} from '@react-navigation/native';
import {User} from '../../../domain/User';
import {
  fetchExtraUsers,
  fetchUsers,
  selectAllUsers,
  selectLoadMore,
  selectSkip,
  selectStatus,
  selectStatusPagination,
  setSkip,
  setUser,
} from '../../../services/redux/reducers/user';
import {useSelector} from 'react-redux';
import SearchView from '../../components/common/SearchView';
import UserCardImage from '../../components/users/UserCardImage';
import UserCardTitle from '../../components/users/UserCardTitle';

const ITEM_HEIGHT = 100;
const limit = 10;
const skipRange = 10;

const UserList = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');

  const data = useSelector(selectAllUsers);
  const status = useSelector(selectStatus);
  const loadMore = useSelector(selectLoadMore);
  const statusPagination = useSelector(selectStatusPagination);
  const skip = useSelector(selectSkip);
  const hasSearchText = searchText.length !== 0;

  const filteredData = useMemo(
    () =>
      data.filter(
        user =>
          user.firstName.includes(searchText) ||
          user.lastName.includes(searchText) ||
          user.university.includes(searchText),
      ),
    [searchText, data],
  );

  const onChange = (text: string) => {
    setSearchText(text);
  };

  const onPressHandler = (item: User) => {
    navigation.navigate('UserDetail');
    dispatch(setUser(item));
  };

  const renderItem = useCallback(
    ({item}: {item: User}) => {
      return (
        <UserCard
          item={item}
          onPress={onPressHandler}
          image={<UserCardImage />}
          title={<UserCardTitle />}
        />
      );
    },
    [data],
  );

  const onEndReached = async () => {
    if (!loadMore || hasSearchText) return;
    await dispatch(fetchExtraUsers(`?skip=${skip}&limit=${limit}`));
    dispatch(setSkip(skip + skipRange));
  };

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator style={{marginVertical: 15}} color={'blue'} />;
  }, [data]);

  const onPullToRefresh = () => {
    if (hasSearchText) return;
    dispatch(fetchUsers(`?skip=0&limit=${limit}`));
    dispatch(setSkip(skipRange));
  };

  return (
    <>
      <SearchView onChange={onChange} />
      <FlatList
        data={filteredData}
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
    </>
  );
};

export default UserList;
