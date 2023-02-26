/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  requestUserPermission,
  notificationListener,
} from './helpers/pushnatification_helper';

import {AppNavigator} from './app.navigator';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      <AppNavigator />
    </>
  );
}

export default App;
