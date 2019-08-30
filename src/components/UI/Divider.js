import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Divider = props => (
  <View
    {...props}
    style={[styles.divider, props.style]}
  />
);

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#EEF1F8"
  }
});
