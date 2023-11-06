import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useUserContext} from '../../../services/contexts/UserCardContext';

const ITEM_HEIGHT = 100;
interface UserCardImageProps {}

const UserCardImage = (props: UserCardImageProps) => {
  const {user} = useUserContext();
  return <Image source={{uri: user.image}} style={styles.image} />;
};

export default UserCardImage;

const styles = StyleSheet.create({
  image: {
    width: ITEM_HEIGHT - 10,
    height: ITEM_HEIGHT - 10,
  },
});
