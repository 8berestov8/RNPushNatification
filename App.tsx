/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {requestUserPermission} from './helpers/pushnotification';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AppNavigator} from './app.navigator';

Ionicons.loadFont().then();

function App(): JSX.Element {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <>
      <AppNavigator />
    </>
  );
}

export default App;
