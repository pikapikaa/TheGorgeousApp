import * as React from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {User} from '../../domain/User';
import {ITEM_HEIGHT} from '../screens/UsersScreen';

interface UserItemProps {
  item: User;
  onPress: (user: User) => void;
}

const UserItem = ({item, onPress}: UserItemProps) => {
  return (
    <Pressable onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View>
          <Text style={styles.title}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.subtitle}>{item.university}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F0ED',
    height: ITEM_HEIGHT,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: ITEM_HEIGHT - 10,
    height: ITEM_HEIGHT - 10,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9892',
  },
});
