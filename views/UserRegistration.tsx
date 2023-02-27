import React from 'react';
import {View, Button, TextInput, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUser} from '../api/user';

export default class UserRegistration extends React.Component {
  state = {
    username: '',
    password: '',
  };
  onChangeText = (key: string, val: string) => {
    this.setState({[key]: val});
  };
  signUp = async () => {
    const {username, password} = this.state;
    const platform = Platform.OS;
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    try {
      await createUser(username, password, fcmtoken, platform).then(user => {
        if (user) {
          AsyncStorage.setItem('user', JSON.stringify(user));
          this.props.navigation.replace('Home');
        }

        console.log(user);
      });
    } catch (err) {
      console.error('error signing up: ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="gray"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <View style={styles.button_box}>
          <Button title="Sign Up" onPress={this.signUp} color="#f18484" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: '#f18484',
    borderRadius: 15,
    fontSize: 18,
    fontWeight: '500',
    borderColor: '#f18484',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
  },
  button_box: {
    width: 350,
    marginTop: 30,
    borderRadius: 15,
  },
});
