import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {selectUser} from '../../../redux/reducers/user';
import {useAppSelector} from '../../../services/hooks';

const SIZE = 130;

const UserInfoImage = () => {
  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      <Image source={{uri: user?.image}} style={styles.image} />
    </View>
  );
};

export default UserInfoImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
});
