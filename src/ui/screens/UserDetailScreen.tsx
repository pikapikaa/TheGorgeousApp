import React, {useCallback, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../services/hooks';
import {fetchUserInfo, selectUser} from '../../services/redux/reducers/user';
import {selectTheme} from '../../services/redux/reducers/themeApp';
import {useSelector} from 'react-redux';
import {ThemeConstants} from '../../libs/constants';
import UserInfo from '../components/users/UserInfo';

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
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={ThemeConstants[theme].fontColor}
        />
      }>
      <UserInfo
        image={<UserInfo.Image />}
        title={<UserInfo.Title />}
        info={<UserInfo.Info />}
      />
    </ScrollView>
  );
};

export default UserDetailScreen;
