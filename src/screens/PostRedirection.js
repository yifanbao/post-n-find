import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '../components/UI/Text';
import COLORS from '../styles/colors';

class PostRedirection extends Component {
  static navigatorStyle = {
    navBarButtonColor: COLORS.PURPLE_GRAY
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onLostSelected = () => {
    this.props.navigator.push({
      screen: 'post-n-find.PostLostNoticeScreen',
      title: 'New Lost Notice'
    });
  };

  onFoundSelected = () => {
    this.props.navigator.push({
      screen: 'post-n-find.PostFoundNoticeScreen',
      title: 'New Found Notice'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, {borderColor: COLORS.ORANGE}]}
          onPress={() => this.onLostSelected()}
        >
          <Text style={[styles.buttonText, {color: COLORS.ORANGE}]}>
            I Lost ...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onFoundSelected()}
        >
          <Text style={styles.buttonText}>
            I Found ...
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    height: 120,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.PURPLE
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.PURPLE
  }
});

export default PostRedirection;
