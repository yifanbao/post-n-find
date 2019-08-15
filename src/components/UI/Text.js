import React from 'react';
import { StyleSheet, TextInput as DefaultTextInput, Text as DefaultText } from 'react-native';

export const TextInput = props => (
  <DefaultTextInput
    {...props}
    style={[styles.textInput, props.style]}
    underlineColorAndroid="transparent"
  />
);

export const Text = props => (
  <DefaultText
    {...props}
    style={[styles.text, props.style]}
  >
    {props.children}
  </DefaultText>
);

export const HeaderText = props => (
  <Text
    {...props}
    style={[styles.headerText, props.style]}
  >
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: "#eee"
  },
  text: {
    color: "black",
    backgroundColor: "transparent"
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold"
  }
});
