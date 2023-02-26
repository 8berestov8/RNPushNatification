import React from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
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
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    try {
      await createUser(username, password, fcmtoken);
    } catch (err) {
      console.log('error signing up: ', err);
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
          <Button title="Sign Up" onPress={this.signUp} />
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
    color: 'gray',
    borderRadius: 15,
    fontSize: 18,
    fontWeight: '500',
    borderColor: 'gray',
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
