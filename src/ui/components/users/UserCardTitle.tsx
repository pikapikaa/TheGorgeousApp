import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemeConstants} from '../../../libs/constants';
import {selectTheme} from '../../../redux/reducers/themeApp';
import {useSelector} from 'react-redux';
import {useUserContext} from '../../../services/contexts/UserCardContext';

interface UserCardTitleProps {}

const UserCardTitle = (props: UserCardTitleProps) => {
  const {user} = useUserContext();
  const theme = useSelector(selectTheme);
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: ThemeConstants[theme].fontColor}]}>
        {user.firstName} {user.lastName}
      </Text>
      <Text
        numberOfLines={2}
        style={[styles.subtitle, {color: ThemeConstants[theme].subtitle}]}>
        {user.university}
      </Text>
    </View>
  );
};

export default UserCardTitle;

const styles = StyleSheet.create({
  container: {flex: 1, paddingEnd: 5},
  title: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Medium',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'RobotoSlab-Thin',
  },
});
