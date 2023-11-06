import React, {memo, ReactNode} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {User} from '../../../domain/User';
import {ThemeConstants} from '../../../libs/constants';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../redux/reducers/themeApp';
import UserCardContext from '../../../services/contexts/UserCardContext';

const ITEM_HEIGHT = 100;

interface UserItemProps {
  item: User;
  onPress: (user: User) => void;
  image: ReactNode;
  title: ReactNode;
}

const UserCard = memo(({item, onPress, image, title}: UserItemProps) => {
  const theme = useSelector(selectTheme);
  return (
    <UserCardContext.Provider value={{user: item}}>
      <Pressable onPress={() => onPress(item)}>
        <View
          style={[
            styles.container,
            {backgroundColor: ThemeConstants[theme].cardColor},
          ]}>
          {image}
          {title}
        </View>
      </Pressable>
    </UserCardContext.Provider>
  );
});

export default UserCard;

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
