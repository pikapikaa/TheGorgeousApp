import React, {ReactNode} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {User} from '../../../domain/User';
import UserImage from './UserImage';
import UserTitle from './UserTitle';
import UserInfo from './UserInfo';

type UserCardProps = {
  image?: ReactNode;
  title?: ReactNode;
  info?: ReactNode;
};

const UserCard = ({image, title, info}: UserCardProps) => {
  return (
    <View style={styles.container}>
      {image}
      {title}
      {info}
    </View>
  );
};

UserCard.Image = UserImage;
UserCard.Title = UserTitle;
UserCard.Info = UserInfo;

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    gap: 40,
  },
});
