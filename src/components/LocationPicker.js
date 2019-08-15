import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

class LocationPicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Locate Me" onPress={() => alert('pick location')} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeholder: {
    width: "80%",
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee"
  },
  buttonContainer: {
    margin: 8
  }
});

export default LocationPicker;
