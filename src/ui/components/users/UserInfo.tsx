import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import UserInfoImage from './UserInfoImage';
import UserInfoTitle from './UserInfoTitle';
import UserInfoData from './UserInfoData';

type UserInfoProps = {
  image?: ReactNode;
  title?: ReactNode;
  info?: ReactNode;
};

const UserInfo = ({image, title, info}: UserInfoProps) => {
  return (
    <View style={styles.container}>
      {image}
      {title}
      {info}
    </View>
  );
};

UserInfo.Image = UserInfoImage;
UserInfo.Title = UserInfoTitle;
UserInfo.Info = UserInfoData;

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    gap: 40,
  },
});
