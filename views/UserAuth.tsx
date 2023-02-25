import React from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';

export default class UserRegistration extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
  };
  onChangeText = (key: string, val: string) => {
    this.setState({[key]: val});
  };
  signUp = async () => {
    const {username, password, email, phone_number} = this.state;
    try {
      console.log(username, password, email, phone_number);

      // here place your signup logic
      console.log('user successfully signed up!: ');
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
