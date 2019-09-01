import React from 'react';
import {StyleSheet, View} from 'react-native';

import COLORS from '../../styles/colors';

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
    marginVertical: 5,
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  }
});
