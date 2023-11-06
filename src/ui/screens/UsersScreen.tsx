import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import {useAppDispatch} from '../../services/hooks';
import {
  fetchUsers,
  selectError,
  selectStatus,
  setSkip,
} from '../../services/redux/reducers/user';
import {useSelector} from 'react-redux';
import KeyboardAvoidingComponent from '../components/common/KeyboardAvoidingComponent';
import {ThemeConstants} from '../../libs/constants';
import {selectTheme} from '../../services/redux/reducers/themeApp';
import TitleView from '../components/users/TitleView';
import UserList from '../components/users/UserList';

const limit = 10;
const skipRange = 10;

const UsersScreen = () => {
  const dispatch = useAppDispatch();
  const [isFirstLoading, setIsFirstLoading] = useState(false);

  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    async function loadUsers() {
      setIsFirstLoading(true);
      await dispatch(fetchUsers(`?skip=0&limit=${limit}`));
      dispatch(setSkip(skipRange));
      setIsFirstLoading(false);
    }
    if (status === 'idle') {
      loadUsers();
    }
  }, [status, dispatch]);

  let content;
  if (isFirstLoading) {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  } else if (status === 'failed') {
    content = (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  } else {
    content = <UserList />;
  }

  return (
    <KeyboardAvoidingComponent>
      <View
        style={[
          styles.container,
          {backgroundColor: ThemeConstants[theme].backgroundColor},
        ]}>
        <TitleView>All Users</TitleView>
        {content}
      </View>
    </KeyboardAvoidingComponent>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    gap: 20,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
