import React from 'react';
import { StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, View, Text } from 'react-native';

export const Button = props => {
  const content = (
    <View style={[styles.button, props.style, props.disabled ? styles.disabled : null]}>
      <Text style={props.disabled ? styles.disabledText : null}>{props.title}</Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }

  switch (Platform.OS) {
    case 'android':
      return (
        <TouchableNativeFeedback onPress={props.onPress}>
          {content}
        </TouchableNativeFeedback>
      );
    case 'ios':
      return (
        <TouchableOpacity onPress={props.onPress}>
          {content}
        </TouchableOpacity>
      );
  }
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black"
  },
  disabled: {
    borderColor: "#aaa",
    backgroundColor: "#eee"
  },
  disabledText: {
    color: "#aaa"
  }
});
