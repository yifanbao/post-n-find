import React, { Component } from 'react';
import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, View, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { TextInput, HeaderText } from '../components/UI/Text';
import { Button, TextButton } from '../components/UI/Button';
import { ActivityIndicator } from '../components/UI/ActivityIndicator';
import validate from '../util/validation';
import { authenticateUser, authAutoSignIn } from '../store/actions/index';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateViewMode);

    this.state = {
      viewMode: Dimensions.get('window').height > 500 ? 'portrait': 'landscape',
      authMode: 'login',
      controls: {
        email: { value: '', isValid: false, validationRules: { isEmail: true }, isTouched: false },
        password: { value: '', isValid: false, validationRules: { minLength: 6 }, isTouched: false },
        confirmPassword: { value: '', isValid: false, validationRules: { equalTo: 'password' }, isTouched: false },
      }
    };
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateViewMode);
  }

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  };

  updateViewMode = ({ window }) => {
    this.setState({
      viewMode: window.height > 500 ? 'portrait': 'landscape'
    })
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onAuthenticateUser(authData, this.state.authMode);
  };

  updateInputState = (key, value) => {
    // get related form input values if are required for validation
    let connectedValue = {};
    // values connected by equalTo rule
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }

    this.setState(({ controls }) => {
      return {
        controls: {
          ...controls,
          // validate confirmPassword if password is mutated
          confirmPassword: {
            ...controls.confirmPassword,
            isValid:
              key === 'password'
                ? validate(
                  controls.confirmPassword.value,
                  controls.confirmPassword.validationRules,
                  controls.password.value
                )
                : controls.confirmPassword.isValid
          },
          // validate the mutated key
          [key]: {
            ...controls[key],
            value,
            isValid: validate(value, controls[key].validationRules, connectedValue),
            isTouched: true
          }
        }
      }
    })
  };

  render() {
    let isPortrait = this.state.viewMode === 'portrait';
    let isLogin = this.state.authMode === 'login';

    let headerText = null;
    if (isPortrait) {
      headerText = (
        <HeaderText>Welcome to PostNFind</HeaderText>
      );
    }

    let confirmPassword = null;
    if (!isLogin) {
      confirmPassword = (
        <TextInput
          style={isPortrait ? {} : styles.landscapePasswordInput}
          placeholder="Confirm Password"
          value={this.state.controls.confirmPassword.value}
          onChangeText={val => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.isTouched ? this.state.controls.confirmPassword.isValid : null}
          secureTextEntry
        />
      )
    }

    const { controls } = this.state;
    let isFormValid = controls.email.isValid
      && controls.password.isValid
      && (isLogin || controls.confirmPassword.isValid);

    let submitButton = (
      <Button
        title={isLogin ? "Login" : "Sign Up"}
        onPress={this.authHandler}
        disabled={!isFormValid}
      />
    );
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {headerText}
        <TextButton
          textBefore={isLogin ? "New to PostNFind?" : "Already have an account?"}
          title={isLogin ? "Sign up here" : "Login now"}
          onPress={this.switchAuthModeHandler}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            {/* E-mail Address */}
            <TextInput
              placeholder="E-mail Address"
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState('email', val)}
              valid={this.state.controls.email.isTouched ? this.state.controls.email.isValid : null}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View style={isPortrait || isLogin ? {} : styles.landscapePasswordContainer}>
              {/* Password */}
              <TextInput
                style={isPortrait || isLogin ? {} : styles.landscapePasswordInput}
                placeholder="Password"
                value={this.state.controls.password.value}
                onChangeText={val => this.updateInputState('password', val)}
                valid={this.state.controls.password.isTouched ? this.state.controls.password.isValid : null}
                secureTextEntry
              />
              {/* Confirm Password */}
              {confirmPassword}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {submitButton}
      </KeyboardAvoidingView>
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
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateUser: (authData, authMode) => dispatch(authenticateUser(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
