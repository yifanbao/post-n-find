import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, ImageBackground } from 'react-native';
import { TextInput, HeaderText } from '../components/UI/Text';
import { Button } from '../components/UI/Button';

import startMainTabs from './startMainTabs';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateViewMode);
  }

  state = {
    isPortrait: Dimensions.get('window').height > 500
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateViewMode);
  }

  updateViewMode = ({ window }) => {
    this.setState({
      isPortrait: window.height > 500
    })
  };

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    let headerText = null;

    if (this.state.isPortrait) {
      headerText = (
        <HeaderText>Welcome to PostNFind</HeaderText>
      );
    }

    return (
      <View style={styles.container}>
        {headerText}
        <Button style={styles.button} title="Switch To Login" onPress={this.loginHandler} />
        <View style={styles.inputContainer}>
          <TextInput placeholder="E-Mail Address" />
          <View style={this.state.isPortrait ? {} : styles.landscapePasswordContainer}>
            <TextInput
              style={this.state.isPortrait ? {} : styles.landscapePasswordInput}
              placeholder="Password" />
            <TextInput
              style={this.state.isPortrait ? {} : styles.landscapePasswordInput}
              placeholder="Confirm Password" />
          </View>
        </View>
        <Button style={styles.button} title="Login" onPress={this.loginHandler} />
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
  },
  landscapePasswordContainer: {
    flexDirection:  "row",
    justifyContent: "space-between"
  },
  landscapePasswordInput: {
    width: "48%"
  },
  button: {
    backgroundColor: "#29aaf4"
  }
});

export default AuthScreen;
