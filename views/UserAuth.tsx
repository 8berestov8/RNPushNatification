import React from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
import {authUser} from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserAuth extends React.Component {
  state = {
    username: '',
    password: '',
  };
  onChangeText = (key: string, val: string) => {
    this.setState({[key]: val});
  };
  signIn = async () => {
    const {username, password} = this.state;
    try {
      await authUser(username, password).then(user => {
        if (user) {
          AsyncStorage.setItem('user', JSON.stringify(user));
          this.props.navigation.replace('Home');
        }
      });
    } catch (err) {
      console.error('error signing: ', err);
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
          <Button title="Sign In" onPress={this.signIn} color="#f18484" />
        </View>
        <View style={styles.singup_box}>
          <Text style={{marginEnd: 20}}>Create account?</Text>
          <Button
            title="Sign Up"
            color="#f18484"
            onPress={() => {
              this.props.navigation.navigate('Registration');
            }}
          />
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
  singup_box: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  button_box: {
    width: 350,
    marginTop: 30,
    borderRadius: 15,
  },
});
