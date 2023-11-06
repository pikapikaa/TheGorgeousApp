import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemeConstants} from '../../../libs/constants';
import {useAppSelector} from '../../../services/hooks';
import {selectUser} from '../../../services/redux/reducers/user';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../services/redux/reducers/themeApp';

const UserInfoTitle = () => {
  const user = useAppSelector(selectUser);
  const theme = useSelector(selectTheme);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: ThemeConstants[theme].fontColor}]}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={[styles.subtitle, {color: ThemeConstants[theme].subtitle}]}>
        {[user?.university]}
      </Text>
    </View>
  );
};

export default UserInfoTitle;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 7,
  },
  title: {
    fontSize: 30,
    fontFamily: 'RobotoSlab-Bold',
  },
  subtitle: {fontSize: 20, fontFamily: 'RobotoSlab-Thin'},
});
