/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {requestUserPermission} from './helpers/pushnatification_helper';
import messaging from '@react-native-firebase/messaging';
import {AppNavigator} from './app.navigator';

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestUserPermission();
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );

          // setInitialRoute(remoteMessage.data.type);
        }
        setLoading(false);
      });
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
