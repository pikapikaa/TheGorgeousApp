import React from 'react';
import {View, StyleSheet, Switch} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme, toggleTheme} from '../../redux/reducers/themeApp';
import {useAppDispatch} from '../../services/hooks';
import {ThemeConstants} from '../../libs/constants';

const TRACK_COLOR = {
  true: 'rgba(256,0,0,0.5)',
  false: 'rgba(0,0,0,1)',
};

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: ThemeConstants[theme].backgroundColor},
      ]}>
      <Switch
        value={theme === 'dark'}
        onValueChange={() => {
          dispatch(toggleTheme());
        }}
        trackColor={TRACK_COLOR}
        thumbColor={'#FF0000'}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
