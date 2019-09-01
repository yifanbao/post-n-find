import React from 'react';
import { StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, View, Text } from 'react-native';

import COLORS from '../../styles/colors';

export const Button = props => {
  const content = (
    <View style={[styles.button, props.style, props.disabled ? styles.disabled : null]}>
      <Text style={[styles.text, props.disabled ? styles.disabledText : null]}>{props.title}</Text>
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
    alignItems: "center",
    minWidth: 70,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PURPLE
  },
  text: {
    fontSize: 16,
    color: COLORS.WHITE
  },
  disabled: {
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  },
  disabledText: {
    color: COLORS.GRAY_LIGHTEN_2
  }
});
