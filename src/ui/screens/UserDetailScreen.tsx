import React, {useCallback, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../services/hooks';
import {fetchUserInfo, selectUser} from '../../redux/reducers/user';
import {selectTheme} from '../../redux/reducers/themeApp';
import {useSelector} from 'react-redux';
import {ThemeConstants} from '../../libs/constants';
import UserCard from '../components/users/UserCard';

const UserDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const theme = useSelector(selectTheme);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchUserInfo(`/${user?.id}`));
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: ThemeConstants[theme].backgroundColor}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <UserCard
        image={<UserCard.Image />}
        title={<UserCard.Title />}
        info={<UserCard.Info />}
      />
    </ScrollView>
  );
};

export default UserDetailScreen;
