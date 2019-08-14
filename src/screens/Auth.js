import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput, HeaderText } from '../components/UI/Text';
import { Button } from '../components/UI/Button';

import startMainTabs from './startMainTabs';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderText>Welcome to PostNFind</HeaderText>
        <Button style={{backgroundColor: "#29aaf4"}} title="Switch To Login" onPress={this.loginHandler} />
        <View style={styles.inputContainer}>
          <TextInput placeholder="E-Mail Address" />
          <TextInput placeholder="Password" />
          <TextInput placeholder="Confirm Password" />
        </View>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  }
});

export default AuthScreen;
