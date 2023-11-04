import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import UsersScreen from './src/ui/screens/UsersScreen';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/application/navigation/Navigation';
import {SafeAreaView} from 'react-native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
