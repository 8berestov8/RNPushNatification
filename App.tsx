/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {requestUserPermission} from './helpers/pushnotification';

import {AppNavigator} from './app.navigator';

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
