import React from 'react';
import { StyleSheet, View, TextInput as DefaultTextInput, Text as DefaultText } from 'react-native';

export const TextInput = props => (
  <DefaultTextInput
    {...props}
    style={[styles.textInput, props.style, props.valid === false ? styles.invalid : null]}
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

export const TitleText = props => (
  <View style={styles.titleTextContainer}>
    <Text
      {...props}
      style={[styles.titleText, props.style]}
    >
      {props.children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    padding: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#EEF1F8",
    fontSize: 16,
    color: "#393C41"
  },
  invalid: {
    borderColor: "red",
    backgroundColor: "#F9C0C0"
  },
  text: {
    color: "#393C41",
    backgroundColor: "transparent"
  },
  headerText: {
    lineHeight: 50,
    fontSize: 28,
    fontWeight: "bold"
  },
  titleTextContainer: {
    width: "100%",
    justifyContent: "flex-start",
    padding: 10,
    paddingBottom: 5
  },
  titleText: {
    fontSize: 14,
    // color: "#494568"
  }
});
