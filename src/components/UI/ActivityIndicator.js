import React from 'react';
import { StyleSheet, View, ActivityIndicator as DefaultActivityIndicator} from 'react-native';

import COLORS from '../../styles/colors';

export const ActivityIndicator = props => (
  <DefaultActivityIndicator
    {...props}
    style={[styles.activityIndicator, props.style]}
    color={COLORS.PURPLE}
    selectionColor={COLORS.PURPLE}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  activityIndicator: {
    margin: 5,
    padding: 10
  }
});
