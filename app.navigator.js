import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserRegistration from './views/UserRegistration';
import UserAuth from './views/UserAuth';
import {MainScreen} from './views/Main';
import {NotificationScreen} from './views/Notification';
import {navigationRef, reset} from './RootNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const onReady = props => {
  AsyncStorage.getItem('user').then(user => {
    if (JSON.parse(user)) {
      reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  });
};
function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Main');

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Quiet and Background State -> Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type);
        }
      })
      .catch(error => console.log('failed', error));

    // Foreground State
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      navigation.navigate(remoteMessage.data.type);
    });
    setLoading(false);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return null;
  }

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f18484',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Group>
          <Stack.Screen name="Authentication" component={UserAuth} />
          <Stack.Screen name="Registration" component={UserRegistration} />
        </Stack.Group>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
