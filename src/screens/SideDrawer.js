import React, { Component } from 'react';
import { StyleSheet, Platform, TouchableOpacity, Dimensions, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { authLogout } from '../store/actions/index';
import COLORS from '../styles/colors';

class SideDrawer extends Component{
  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              style={styles.drawerItemIcon}
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color="#aaa"
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: COLORS.WHITE
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  }
};

export default connect(null, mapDispatchToProps)(SideDrawer);
