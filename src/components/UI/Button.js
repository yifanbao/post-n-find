import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export const Button = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={[styles.button, props.style]}>
      <Text>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black"
  }
});
