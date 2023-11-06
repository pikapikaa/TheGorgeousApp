import React, {memo} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {User} from '../../domain/User';
import {ThemeConstants} from '../../libs/constants';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/reducers/themeApp';

const ITEM_HEIGHT = 100;

interface UserItemProps {
  item: User;
  onPress: (user: User) => void;
}

const UserItem = memo(({item, onPress}: UserItemProps) => {
  const theme = useSelector(selectTheme);
  return (
    <Pressable onPress={() => onPress(item)}>
      <View
        style={[
          styles.container,
          {backgroundColor: ThemeConstants[theme].cardColor},
        ]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.right}>
          <Text
            style={[styles.title, {color: ThemeConstants[theme].fontColor}]}>
            {item.firstName} {item.lastName}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.subtitle, {color: ThemeConstants[theme].subtitle}]}>
            {item.university}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

export default UserItem;

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: ITEM_HEIGHT - 10,
    height: ITEM_HEIGHT - 10,
  },
  right: {flex: 1, paddingEnd: 5},
  title: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Medium',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'RobotoSlab-Thin',
  },
});
