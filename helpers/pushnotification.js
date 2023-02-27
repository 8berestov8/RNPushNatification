import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import notifee from '@notifee/react-native';

if (Platform.OS === 'android') {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMtoken();
  }
}

async function getFCMtoken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      let token = await messaging().getToken();
      if (token) {
        console.log(token);
        AsyncStorage.setItem('fcmtoken', token);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

class NatificationService {
  static displayNotification = async (titel, body) => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'testaufgabe-715e5',
      name: 'TestAufgabe',
    });

    // Display a notification
    await notifee.displayNotification({
      title: titel,
      body: body,
      android: {
        channelId,
        asForegroundService: true,
        pressAction: {
          id: 'default',
        },
      },
    });
  };
}

export default NatificationService;
