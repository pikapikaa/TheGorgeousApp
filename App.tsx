import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/services/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {Platform, SafeAreaView} from 'react-native';

import Navigation from './src/application/navigation/Navigation';

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'ios') return;
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
