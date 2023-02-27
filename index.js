/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import NatificationService from './helpers/pushnotification';

notifee.registerForegroundService(notification => {
  return new Promise(() => {
    NatificationService.displayNotification(
      notification.body,
      notification.title,
      notification.id,
    );
  });
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    this.props.navigation.navigate(type);

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  NatificationService.displayNotification(
    remoteMessage.notification.body,
    remoteMessage.notification.title,
    remoteMessage.messageId,
  );
});

AppRegistry.registerComponent(appName, () => App);
