import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
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
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
