import React, {useState} from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';

interface ProfileScreenProps {}
type ThemeApp = 'light' | 'dark';
const TRACK_COLOR = {
  true: 'rgba(256,0,0,0.5)',
  false: 'rgba(0,0,0,1)',
};

const ProfileScreen = (props: ProfileScreenProps) => {
  const [theme, setTheme] = useState<ThemeApp>('light');
  return (
    <View style={styles.container}>
      <Switch
        value={theme === 'dark'}
        onValueChange={flag => {
          setTheme(flag ? 'dark' : 'light');
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
