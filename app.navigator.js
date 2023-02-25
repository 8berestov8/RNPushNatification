import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserRegistration from './views/UserRegistration';
import UserAuth from './views/UserAuth';
import {HomeScreen} from './views/Home';
import {NotificationScreen} from './views/Notification';
import {navigationRef, navigate, dispatch, reset} from './RootNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const onReady = props => {
  AsyncStorage.getItem('sessionId').then(sessionId => {
    if (sessionId !== -1 && sessionId === null) {
      // reset({
      //   index: 0,
      //   routes: [{name: 'Auth'}],
      // });
    } else if (sessionId !== -1) {
      reset({
        index: 0,
        routes: [{name: 'ToDo'}],
      });
    }
  });
};
export const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      {onReady ? (
        <Stack.Navigator>
          <Stack.Screen name="Registration" component={UserRegistration} />
          <Stack.Screen name="Authentication" component={UserAuth} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator headerMode="none">
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Notification" component={NotificationScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
