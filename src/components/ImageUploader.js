import React, { Component } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import imagePlaceHolder from "../assets/NYC.jpeg";

class ImageUploader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.imagePreview} source={imagePlaceHolder} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Upload Image" onPress={() => alert('upload image')} />
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
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});

export default ImageUploader;
