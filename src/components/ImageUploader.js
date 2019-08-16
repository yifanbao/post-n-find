import React, { Component } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class ImageUploader extends Component {
  state = {
    pickedImage: null
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image' }, res => {
      if (res.didCancel) {
        console.log('User Canceled');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onPickImage({ uri: res.uri })
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.imagePreview} source={this.state.pickedImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Upload Image" onPress={this.pickImageHandler} />
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
