import React from 'react';
import {StyleSheet, Switch} from 'react-native';
import {useSelector} from 'react-redux';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {selectTheme, toggleTheme} from '../../services/redux/reducers/themeApp';
import {useAppDispatch} from '../../services/hooks';
import {ThemeConstants} from '../../libs/constants';

const TRACK_COLOR = {
  true: 'rgba(256,0,0,0.5)',
  false: 'rgba(0,0,0,1)',
};

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        ThemeConstants['light'].backgroundColor,
        ThemeConstants['dark'].backgroundColor,
      ],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Switch
        value={theme === 'dark'}
        onValueChange={() => {
          dispatch(toggleTheme());
        }}
        trackColor={TRACK_COLOR}
        thumbColor={'#FF0000'}
      />
    </Animated.View>
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
