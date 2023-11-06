import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemeConstants} from '../../../libs/constants';
import {selectUser} from '../../../redux/reducers/user';
import {selectTheme} from '../../../redux/reducers/themeApp';
import {useAppSelector} from '../../../services/hooks';
import {useSelector} from 'react-redux';

const UserInfoData = () => {
  const user = useAppSelector(selectUser);
  const theme = useSelector(selectTheme);
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: ThemeConstants[theme].fontColor}]}>
        age: {user?.age}
      </Text>
      <Text style={[styles.text, {color: ThemeConstants[theme].fontColor}]}>
        gender: {user?.gender}
      </Text>
      <Text style={[styles.text, {color: ThemeConstants[theme].fontColor}]}>
        blood group: {user?.bloodGroup}
      </Text>
      <Text style={[styles.text, {color: ThemeConstants[theme].fontColor}]}>
        phone: {user?.phone}
      </Text>
      <Text style={[styles.text, {color: ThemeConstants[theme].fontColor}]}>
        email: {user?.email}
      </Text>
    </View>
  );
};

export default UserInfoData;

const styles = StyleSheet.create({
  container: {gap: 5},
  text: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Thin',
  },
});
